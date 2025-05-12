import React from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../utils/styles";

const SocialMediaLogin = () => {
  const navigation = useNavigation();

  const handleSocialLogin = async (provider) => {
    let result;
    try {
      const response = await fetch(
        `https://ulexe.com/api/c/v1/auth/${provider}`
      );
      const data = await response.json();

      if (data.status && data.data.redirect_url) {
        result = await WebBrowser.openAuthSessionAsync(data.data.redirect_url);

        if (result.type === "success") {
          const tokenResponse = await fetch(
            `https://ulexe.com/api/c/v1/auth/${provider}/callback`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const tokenData = await tokenResponse.json();

          if (tokenData.data.access_token) {
            const token = tokenData.data.access_token;

            await AsyncStorage.setItem("token", token);

            navigation.navigate("Bookings");
          } else {
            Alert.alert("Login Failed", "No token received.");
          }
        } else if (result.type === "cancel") {
          Alert.alert("Login Cancelled", "Login process was cancelled.");
        } else {
          Alert.alert("Login Failed", "Could not log in. Please try again.");
        }
      } else {
        Alert.alert(
          "Error",
          "Failed to generate redirect URL. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during social login:", error);
      Alert.alert("Login Failed", "An error occurred during login.");
    }
  };

  return (
    <View style={styles.socialButtonContainer}>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => handleSocialLogin("facebook")}
      >
        <Image
          style={styles.socialIcon}
          source={require("../../assets/images/facebook.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => handleSocialLogin("google")}
      >
        <Image
          style={styles.socialIcon}
          source={require("../../assets/images/google.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SocialMediaLogin;
