import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "../../utils/api";
import { styles } from "../../utils/styles";
import MainButton from "../../components/MainButton";
import InputField from "../../components/InputField";
import PasswordField from "../../components/PasswordField";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/Ulexe.svg";
import { registerForPushNotificationsAsync } from "../../helpers/PushNotification";
import SocialMediaLogin from "./SocialMediaLogin";

const Login = ({ navigation }) => {
  const [notificationsToken, setNotificationsToken] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState("");

  const setNotificationsSettings = async () => {
    const token = await registerForPushNotificationsAsync();
    setNotificationsToken(token);
    setAllowNotifications(token ? true : false);
  };
  setNotificationsSettings();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (inputErrors[name]) {
      setInputErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);

      if (errors.email) {
        emailInputRef.current.focus();
      } else if (errors.password) {
        passwordInputRef.current.focus();
      }

      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      let body;
      if (Platform.OS === "ios") {
        const InputData = new FormData();
        InputData.append("email", formData.email);
        InputData.append("password", formData.password);
        InputData.append("allow_notifications", allowNotifications ? 1 : 0);
        InputData.append("notifications_token", notificationsToken);
        body = InputData;
      } else {
        body = {
          email: formData.email,
          password: formData.password,
          allow_notifications: allowNotifications ? 1 : 0,
          notifications_token: notificationsToken,
        };
      }

      let data = await apiCall(`/login`, "POST", body, false);
      if (data.status === "Error") {
        showToast(
          "error",
          "Login Failed",
          data.msg || "There was an error logging in."
        );
      } else {
        await AsyncStorage.setItem("userId", `${data?.data.id}`);
        await AsyncStorage.setItem("access_token", data?.data.access_token);
        await AsyncStorage.setItem("refresh_token", data?.data.refresh_token);
        await AsyncStorage.setItem("expires_in", String(data?.data.expires_in));
        await AsyncStorage.setItem(
          "token_saved_time",
          String(Math.floor(Date.now() / 1000))
        );
        await AsyncStorage.setItem(
          "profileImage",
          data?.data?.user.profile_image ? data?.data.user.profile_image : ""
        );

        showToast(
          "success",
          "Login Success",
          "You have logged in successfully"
        );
        const previousScreen = await AsyncStorage.getItem("previousScreen");
        const previousService = await AsyncStorage.getItem("previousService");
        const serviceData = previousService
          ? JSON.parse(previousService)
          : null;
        await AsyncStorage.removeItem("previousScreen");
        await AsyncStorage.removeItem("previousService");
        if (previousScreen === "ServiceDetails" && serviceData) {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: previousScreen || "MainScreen",
                  params: { service: serviceData },
                },
              ],
            });
          });
        } else {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "MainScreen" }],
            });
          });
        }
      }
    } catch (error) {
      showToast("error", "Network Error", "There was an error logging in.");
    }
  };

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });
  };

  return (
    <SafeAreaView style={internalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={internalStyles.container}
      >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={internalStyles.scrollContainer}
        >
          <View style={internalStyles.contentContainer}>
            <View style={{ alignItems: "center" }}>
              <Logo marginBottom={20} />
            </View>
            <View style={styles.authContainer}>
              <Text style={styles.authHeading}>Account Login</Text>
              <Text style={styles.authDes}>
                Sign in to manage your clinic profile and appointments.
              </Text>
            </View>
            {/* Email Input */}
            <InputField
              inputLabel='Email'
              value={formData.email}
              placeholder='Email Address'
              onChangeText={(value) => handleChange("email", value)}
              keyboardType='email-address'
              error={inputErrors.email}
              errorMessage={inputErrors.email}
              ref={emailInputRef}
            />
            {/* Password Input */}
            <PasswordField
              label='Password'
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              secureTextEntry={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              placeholder='*********'
              error={inputErrors.password}
              errorMessage='Password is required'
              ref={passwordInputRef}
            />

            <Text style={styles.forgotPasswordText}>
              If you have forgotten your password{" "}
              <Text
                style={styles.recoverLink}
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                Recover It
              </Text>
            </Text>

            <MainButton buttonText='Sign In' onPress={handleSubmit} />

            <View style={{ alignItems: "center", gap: 8 }}>
              <Text style={[styles.authLinkText]}>or signup with</Text>
              <SocialMediaLogin />
            </View>
            <View>
              <Text style={styles.authLinkText}>
                If you don't have an account
              </Text>
              <Text
                style={styles.authLink}
                onPress={() => navigation.navigate("Signup")}
              >
                Create New Account
              </Text>
            </View>
          </View>
        </ScrollView>

        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 8,
  },
});
