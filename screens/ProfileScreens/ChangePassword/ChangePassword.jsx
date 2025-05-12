import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { apiCall } from "../../../utils/api";
import Toast from "react-native-toast-message";
import PasswordField from "../../../components/PasswordField";
import MainButton from "../../../components/MainButton";
import { colors } from "../../../utils/colors";

const showToast = (type, title, message) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 10,
  });
};

const ChangePassword = ({ navigation }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (inputErrors[name]) {
      setInputErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let firstErrorField = null;

    if (!formData.oldPassword) {
      errors.oldPassword = "Old password is required";
      firstErrorField = oldPasswordRef;
    }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
      firstErrorField = firstErrorField || newPasswordRef;
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      firstErrorField = firstErrorField || newPasswordRef;
    }

    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = "Confirm password is required";
      firstErrorField = firstErrorField || confirmPasswordRef;
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
      firstErrorField = firstErrorField || confirmPasswordRef;
    }

    setInputErrors(errors);

    if (firstErrorField) {
      firstErrorField.current.focus();
    }

    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (!validateForm()) return;

    try {
      const response = await apiCall(
        `/update/password`,
        "PUT",
        {
          current_password: formData.oldPassword,
          new_password: formData.newPassword,
          new_password_confirmation: formData.confirmNewPassword,
        },
        {},
        true,
        "token"
      );

      if (response.status === "Error") {
        const serverErrors = {};

        if (response.errors) {
          const errorMessages = Object.entries(response.errors)
            .map(
              ([key, value]) => `${key.replace("_", " ")}: ${value.join(", ")}`
            )
            .join("\n");

          showToast("error", "Validation Error", errorMessages);

          Object.entries(response.errors).forEach(([key, value]) => {
            switch (key) {
              case "current_password":
                serverErrors.oldPassword = value.join(" ");
                break;
              case "new_password":
                serverErrors.newPassword = value.join(" ");
                break;
              case "confirm_password":
                serverErrors.confirmNewPassword = value.join(" ");
                break;
              default:
                break;
            }
          });
        }

        setInputErrors(serverErrors);

        const errorFieldRefs = {
          oldPassword: oldPasswordRef,
          newPassword: newPasswordRef,
          confirmNewPassword: confirmPasswordRef,
        };

        const firstErrorField = Object.keys(serverErrors)[0];
        if (firstErrorField && errorFieldRefs[firstErrorField]) {
          errorFieldRefs[firstErrorField].current.focus();
        }
      } else {
        showToast("success", "Success", "Password updated successfully");
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      showToast(
        "error",
        "Error",
        "An error occurred while updating the password"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.passwordFields}>
        <PasswordField
          label='Old Password'
          value={formData.oldPassword}
          onChangeText={(value) => handleChange("oldPassword", value)}
          secureTextEntry={showOldPassword}
          togglePasswordVisibility={() => setShowOldPassword(!showOldPassword)}
          placeholder='********'
          placeholderTextColor={colors.Neutrals300}
          error={inputErrors.oldPassword}
          errorMessage={inputErrors.oldPassword}
          ref={oldPasswordRef}
        />

        <PasswordField
          label='New Password'
          value={formData.newPassword}
          onChangeText={(value) => handleChange("newPassword", value)}
          secureTextEntry={showNewPassword}
          togglePasswordVisibility={() => setShowNewPassword(!showNewPassword)}
          placeholder='********'
          placeholderTextColor={colors.Neutrals300}
          error={inputErrors.newPassword}
          errorMessage={inputErrors.newPassword}
          ref={newPasswordRef}
        />

        <PasswordField
          label='Confirm New Password'
          value={formData.confirmNewPassword}
          onChangeText={(value) => handleChange("confirmNewPassword", value)}
          secureTextEntry={showConfirmPassword}
          togglePasswordVisibility={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          placeholder='********'
          error={inputErrors.confirmNewPassword}
          errorMessage={inputErrors.confirmNewPassword}
          ref={confirmPasswordRef}
        />
      </View>

      <View style={styles.mainButtonContainer}>
        <MainButton buttonText='Save' onPress={handleUpdatePassword} />
      </View>

      <Toast />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  passwordFields: {
    padding: 16,
  },
  mainButtonContainer: {
    padding: 16,
  },
});
