import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-input";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { styles } from "../../utils/styles";
import MainButton from "../../components/MainButton";
import PasswordField from "../../components/PasswordField";
import InputField from "../../components/InputField";
import { apiCall } from "../../utils/api";
import { StyleSheet } from "react-native";
import { getCalendars } from "expo-localization";
import { registerForPushNotificationsAsync } from "../../helpers/PushNotification";
import Icon from "react-native-vector-icons/Ionicons";
import Facebook from "../../assets/images/facebook.svg";
import Google from "../../assets/images/google.svg";
import SocialMediaLogin from "./SocialMediaLogin";
const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const { timeZone } = getCalendars()[0];
  const [notificationsToken, setNotificationsToken] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState("");
  const setNotificationsSettings = async () => {
    const token = await registerForPushNotificationsAsync();
    setNotificationsToken(token);
    setAllowNotifications(token ? true : false);
  };
  setNotificationsSettings();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country_code: "",
    password: "",
    timezone: timeZone,
  });

  const nameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (inputErrors[name]) {
      setInputErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
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

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = {};

    if (!formData.first_name) {
      errors.first_name = "First Name is required";
    }
    if (!formData.last_name) {
      errors.last_name = "Last Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.length < 8 || formData.phone.length > 15) {
      errors.phone = "Phone number must be between 8 and 15 digits";
    }
    if (!formData.password || formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      if (errors.first_name) nameInputRef.current.focus();
      else if (errors.last_name) lastNameInputRef.current.focus();
      else if (errors.email) emailInputRef.current.focus();
      else if (errors.phone) phoneInputRef.current.focus();
      else if (errors.password) passwordInputRef.current.focus();

      return false;
    }

    return true;
  };

  const handlePhoneNumberChange = (value) => {
    const countryCode = phoneInputRef.current?.getCountryCode();
    const phoneNumber = value.replace(`+${countryCode}`, "").trim();

    setFormData({
      ...formData,
      phone: phoneNumber,
      country_code: `+${countryCode}`,
    });

    if (inputErrors.phone) {
      setInputErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      let body;
      if (Platform.OS === "ios") {
        const InputData = new FormData();
        InputData.append("first_name", formData.first_name);
        InputData.append("last_name", formData.last_name);
        InputData.append("email", formData.email);
        InputData.append("phone", formData.phone);
        InputData.append("country_code", formData.country_code);
        InputData.append("password", formData.password);
        InputData.append("timezone", formData.timezone);
        InputData.append("allow_notifications", allowNotifications ? 1 : 0);
        InputData.append("notifications_token", notificationsToken);
        body = InputData;
      } else {
        body = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          country_code: formData.country_code,
          password: formData.password,
          timezone: formData.timezone,
          allow_notifications: allowNotifications ? 1 : 0,
          notifications_token: notificationsToken,
        };
      }

      const response = await apiCall("/register", "POST", body, false);

      if (response.status === true) {
        const { access_token, refresh_token, expires_in, user_id } =
          response.data;
        if (user_id) {
          await AsyncStorage.setItem("user_id", String(user_id));
        }
        if (access_token) {
          await AsyncStorage.setItem("access_token", access_token);
        }
        if (refresh_token) {
          await AsyncStorage.setItem("refresh_token", refresh_token);
        }
        if (expires_in) {
          await AsyncStorage.setItem("expires_in", String(expires_in));
        }

        showToast(
          "success",
          "Signup Success",
          "Your account created successfully."
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
      } else {
        let errors = {};
        if (response?.errors?.email) {
          errors.email = response?.errors?.email;
          emailInputRef.current.focus();
        } else if (response?.errors?.password) {
          errors.email = response?.errors?.password;
        } else if (response?.errors?.phone) {
          errors.email = response?.errors?.phone;
        } else {
          showToast("error", "Signup Failed", "Something went wrong.");
        }
        setInputErrors(errors);
      }
    } catch (error) {
      showToast(
        "error",
        "Network Error",
        error.message || "There was an error signing up."
      );
    }
  };

  return (
    <SafeAreaProvider>
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
              <View style={styles.authContainer}>
                <Text style={styles.authHeading}>Create Your Account</Text>
                <Text style={styles.authDes}>
                  Join our community and start your journey to flawless skin.
                  Fill in your details below to get started.
                </Text>
              </View>
              {/* Clinic Name Input */}
              <InputField
                inputLabel='First Name'
                value={formData.first_name}
                placeholder='First Name'
                onChangeText={(value) => handleChange("first_name", value)}
                error={inputErrors.first_name}
                errorMessage={inputErrors.first_name}
                ref={nameInputRef}
              />
              <InputField
                inputLabel='Last Name'
                value={formData.last_name}
                placeholder='Last Name'
                onChangeText={(value) => handleChange("last_name", value)}
                error={inputErrors.last_name}
                errorMessage={inputErrors.last_name}
                ref={lastNameInputRef}
              />
              {/* Email Input */}
              <InputField
                inputLabel='Email'
                value={formData.email}
                placeholder='example@email.com'
                onChangeText={(value) => handleChange("email", value)}
                keyboardType='email-address'
                error={inputErrors.email}
                errorMessage={inputErrors.email}
                ref={emailInputRef}
              />
              {/* Phone Number */}
              <View>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <PhoneInput
                  ref={phoneInputRef}
                  initialCountry='us'
                  initialValue={formData.phone}
                  onChangePhoneNumber={handlePhoneNumberChange}
                  flagStyle={{ marginLeft: 10 }}
                  style={[
                    styles.phoneNumberInput,
                    inputErrors.phone && styles.ValidationErrorInput,
                  ]}
                />
                <Text style={styles.errorText}>
                  {inputErrors.phone ? inputErrors.phone : ""}
                </Text>
              </View>
              {/* Password Input */}
              <PasswordField
                label='Password'
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                placeholder='*********'
                error={inputErrors.password}
                errorMessage={inputErrors.password}
                ref={passwordInputRef}
              />
              <View style={{ marginTop: 6 }}>
                <MainButton
                  style={{ marginTop: 0 }}
                  buttonText='Sign up'
                  onPress={handleSubmit}
                />
              </View>
              <View style={{ alignItems: "center", gap: 8 }}>
                <Text style={[styles.authLinkText]}>or signup with</Text>
                <SocialMediaLogin />
              </View>
              <Text style={[styles.authLinkText]}>
                I already have an account{" "}
                <Text
                  style={styles.authLink}
                  onPress={() => navigation.navigate("Login")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </ScrollView>
          <Toast />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Signup;

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
