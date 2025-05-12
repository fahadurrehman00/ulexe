import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "./api";

export const isTokenExpired = async () => {
  try {
    const expiresIn = await AsyncStorage.getItem("expires_in");
    const tokenSavedTime = await AsyncStorage.getItem("token_saved_time");

    if (!expiresIn || !tokenSavedTime) {
      console.warn(
        "Expiration time or saved time missing. Token considered expired."
      );
      return true;
    }

    const expirationDuration = Number(expiresIn);
    const savedTime = Number(tokenSavedTime);

    if (isNaN(expirationDuration) || isNaN(savedTime)) {
      console.error(
        "Invalid expiration duration or token saved time. Token considered expired."
      );
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpirationTime = savedTime + expirationDuration;

    return currentTime >= tokenExpirationTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

export const refreshToken = async () => {
  try {
    const refresh_token = await AsyncStorage.getItem("refresh_token");

    if (!refresh_token) {
      console.warn("No refresh token found");
      return null;
    }

    const response = await apiCall(`/refresh`, "POST");

    if (!response.ok) {
      console.error("Failed to refresh token, status:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data || !data.access_token) {
      console.error("Invalid response or access token missing from API");
      return null;
    }

    const { access_token, expires_in } = data;

    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem(
      "token_saved_time",
      String(Math.floor(Date.now() / 1000))
    );
    await AsyncStorage.setItem("expires_in", String(expires_in));

    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
