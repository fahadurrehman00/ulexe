import React, { useState, useRef } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import MainButton from "../../../components/MainButton";
import InputField from "../../../components/InputField";
import { styles } from "../../../utils/styles";
import { apiCall } from "../../../utils/api";

const ForgetPasswordEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const emailInputRef = useRef(null);

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

  const handleRequestOTP = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setInputError("Please enter an email address");
      emailInputRef.current.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      setInputError("Please enter a valid email address");
      emailInputRef.current.focus();
      return;
    }

    setInputError("");
    try {
      const response = await apiCall(`/verify/email`, "POST", { email }, false);
      if (response.status === "Error") {
        throw new Error(response.msg || "Failed to request OTP");
      }

      showToast(
        "success",
        "OTP Requested",
        response.msg.original.msg
      );
      setTimeout(() => {
        navigation.navigate("ForgetPasswordVerification", { email });
      }, 1000);
    } catch (error) {
      showToast("error", "Error", error.message);
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (inputError) {
      setInputError("");
    }
  };

  return (
    <View style={styles.forgetContainer}>
      <Text style={styles.authHeading}>Forget Password?</Text>
      <Text style={styles.authDes}>
        Reset your password effortlessly by requesting email confirmation.
      </Text>

      <View style={styles.forgetInputContainer}>
        <InputField
          inputLabel='Email Address'
          value={email}
          placeholder='Email Address'
          onChangeText={handleEmailChange}
          keyboardType='email-address'
          error={!!inputError}
          errorMessage={inputError}
          ref={emailInputRef}
        />
        <MainButton
          customStyle={{ marginTop: 8 }}
          buttonText='Request OTP'
          onPress={handleRequestOTP}
        />
      </View>

      <Text style={styles.rememberedText}>Remembered Password?</Text>
      <Text
        style={styles.signInLink}
        onPress={() => navigation.navigate("Login")}
      >
        Try Sign In
      </Text>
      <Toast />
    </View>
  );
};

export default ForgetPasswordEmail;
