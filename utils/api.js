import { isTokenExpired, refreshToken } from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "../helpers/PushNotification";

export const getToken = async () => {
  try {
    let token = await AsyncStorage.getItem("access_token");

    const expired = await isTokenExpired();

    if (expired) {
      token = await refreshToken();

      if (!token) {
        console.log("Unable to refresh token");
        return null;
      }
    }

    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

const getDefaultHeaders = (
  token = null,
  additionalHeaders = {},
  authType = "token"
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] =
      authType == "key" ? token : `Bearer ${token}`;
    defaultHeaders["AuthorizationType"] = authType;
  }

  return {
    ...defaultHeaders,
    ...additionalHeaders,
  };
};

const handleApiResponse = async (response) => {
  try {
    let data;

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error("Response is not valid JSON, handling as text:", data);
      }
    }

    if (!response.ok) {
      if (data && data.msg === "Token is Expired") {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("expires_in");
      }
    }

    return data;
  } catch (error) {
    console.error("Error handling API response:", error);
    throw new Error("Failed to process the API response.");
  }
};

const handleNotifications = async () => {
  const notification_token = await registerForPushNotificationsAsync();

  let body = {
    allow_notifications: notification_token ? 1 : 0,
    notifications_token: notification_token ? notification_token : null,
  };

  let token = null;
  token = await getToken();
  if (token) {
    const headers = getDefaultHeaders(token);
    let method = "POST";
    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(
      "https://ulexe.com/api/c/v1/notifications/settings",
      options
    );
    if (!response.ok) {
      console.error("Failed to send push notification:", response.statusText);
      return;
    } else {
      console.log("notifictaions response success");
    }
  }
};

export const apiCall = async (
  slug,
  method = "GET",
  body = null,
  requireAuth = true,
  additionalHeaders = {},
  authType = "key"
) => {
  let token = null;

  if (requireAuth) {
    try {
      token =
        authType == "token"
          ? await getToken()
          : "f8c9d249bc8d0c1b6d7e60f960aef4202db4d56e2e55972b90b865c5b7a4d3c4";
    } catch (error) {
      console.error("Failed to get token:", error);
      throw new Error("Authentication failed");
    }
  }

  const headers = getDefaultHeaders(token, additionalHeaders, authType);

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }
  const url = `https://ulexe.com/api/c/v1${slug}`;

  try {
    await handleNotifications();
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await fetch(url, options);
    return await handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};
