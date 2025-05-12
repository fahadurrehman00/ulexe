import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import MainButton from "../../../components/MainButton";
import PasswordField from "../../../components/PasswordField";
import { styles } from "../../../utils/styles";
import { apiCall } from "../../../utils/api";
import { colors } from "../../../utils/colors";

const ForgetPasswordReset = ({ navigation, route }) => {
  let { email } = route.params;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState("");

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

  const handleResetPassword = async () => {
    if (password.length < 8) {
      setInputError("Password must be at least 8 characters long.");

      return;
    }

    setInputError("");

    try {
      const data = await apiCall(
        `/reset/password`,
        "POST",
        { email, password },
        false
      );
      if (data.status === true) {
        showToast(
          "success",
          "Password Reset Successful",
          data.msg || "Your password has been reset successfully."
        );

        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      } else {
        throw new Error(
          data.msg || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Network Error",
        error.message || "An error occurred while resetting your password."
      );
    }
  };

  return (
    <View style={styles.forgetContainer}>
      <Text style={styles.authHeading}>Reset Password</Text>
      <Text style={styles.authDes}>
        You can now proceed to set a new password for your account.
      </Text>

      <View style={styles.forgetInputContainer}>
        <PasswordField
          label='Password'
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (inputError) setInputError("");
          }}
          secureTextEntry={!showPassword}
          togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
          placeholder='*********'
          placeholderTextColor={colors.Neutrals300}
          error={!!inputError}
          errorMessage={inputError}
        />
        <MainButton
          customStyle={{ marginTop: 8 }}
          buttonText='Reset Password'
          onPress={handleResetPassword}
        />
      </View>

      <Text style={styles.rememberedText}>Go back to</Text>
      <Text
        style={styles.signInLink}
        onPress={() => navigation.navigate("Login")}
      >
        Sign In
      </Text>

      <Toast />
    </View>
  );
};

export default ForgetPasswordReset;
