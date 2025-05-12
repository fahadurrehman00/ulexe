import React, { useState, useRef } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import MainButton from "../../../components/MainButton";
import PopupVerification from "../../../components/PopupVerification";
import { styles } from "../../../utils/styles";
import { apiCall } from "../../../utils/api";

const ForgetPasswordVerification = ({ route, navigation }) => {
  let { email } = route.params;
  const [code, setCode] = useState(Array(6).fill(""));
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const inputs = useRef([]);
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 0,
    });
  };

  const handleCodeChange = (value, index) => {
    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    // Move focus forward or backward.
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setInputError("Please enter a full 6-digit code");
      return;
    }
    try {
      const response = await apiCall(
        `/verify/code`,
        "POST",
        {
          email: email,
          code: fullCode,
        },
        false
      );
      if (response.status === true) {
        showToast(
          "success",
          "Verification Successful",
          "Your code has been verified"
        );
        setTimeout(() => {
          navigation.navigate("ForgetPasswordReset", { email });
        }, 1000);
      } else {
        throw new Error(response.message || "Failed to verify the code");
      }
    } catch (error) {
      showToast("error", "Error", error.message || "Something went wrong");
    }
  };

  const handlePopup = () => {
    setIsPopupVisible(true);
  };

  const handleConfirmPopup = async () => {
    try {
      setLoading(true);
      const response = await apiCall(`/verify/email`, "POST", { email }, false);
      if (response.status === true) {
        setCode(Array(6).fill(""));
        showToast("success", "OTP Requested", response.msg.original.msg);
        setTimeout(() => {
          navigation.navigate("ForgetPasswordVerification", { email });
        }, 1000);
        setLoading(false);
        setIsPopupVisible(false);
      } else {
        setLoading(false);
        setIsPopupVisible(false);
      }
    } catch (error) {
      setLoading(false);
      setIsPopupVisible(false);

      showToast("error", "Error", error.message || "Something went wrong");
    }
  };

  const handleCancelPopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <View style={styles.forgetContainer}>
      <Text style={styles.authHeading}>Enter Verification Code</Text>
      <Text style={styles.authDes}>
        A code has been sent to your mail{" "}
        <Text style={styles.inputLabel}>{email}</Text>. Enter so we know you are
        the owner of this account.
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={digit}
            onChangeText={(value) => handleCodeChange(value, index)}
            maxLength={1}
            keyboardType='numeric'
            ref={(input) => (inputs.current[index] = input)}
          />
        ))}
      </View>
      <Text style={styles.errorText}>{inputError}</Text>

      <MainButton
        customStyle={{ marginTop: 8 }}
        buttonText='Confirm OTP'
        onPress={handleConfirm}
      />

      <Text style={styles.rememberedText}>Didn't receive the OTP?</Text>
      <Text style={styles.signInLink} onPress={handlePopup}>
        Send Again
      </Text>

      {isPopupVisible && (
        <PopupVerification
          heading='Resend OTP!'
          message='Are you sure you want to send verification code again to the provided email address?'
          cancelText='Cancel'
          confirmText='Yes, Send'
          onConfirm={handleConfirmPopup}
          onCancel={handleCancelPopup}
          style={styles.resendOTPButton}
          isLoading={loading}
        />
      )}

      <Toast />
    </View>
  );
};

export default ForgetPasswordVerification;
