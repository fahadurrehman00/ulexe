import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { apiCall } from "../utils/api";

// Set the handler for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications and store the token
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      // console.error("Permission not granted for push notifications!");
      return null;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      console.error("Project ID not found");
      return null;
    }

    try {
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      const token = tokenData.data;
      await AsyncStorage.setItem("expoPushToken", token);
      return token;
    } catch (e) {
      console.error(`Error getting push token: ${e}`);
      return null;
    }
  } else {
    console.error("Must use a physical device for push notifications");
    return null;
  }
}

export async function sendPushNotification(title, body, data = {}) {
  try {
    const token = await AsyncStorage.getItem("expoPushToken");

    if (!token) {
      alert("No push token found. Please enable notifications.");
      return;
    }

    const message = {
      to: token,
      sound: "default",
      title,
      body,
      data,
    };

    "Sending push notification with message:", message;

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("Failed to send push notification:", response.statusText);
      return;
    }

    const user_id = await AsyncStorage.getItem("userId");

    const notificationData = {
      user_id,
      title,
      body,
      data,
    };


    const saveResponse = await apiCall(
      `/store/notification`,
      "POST",
      notificationData,
      true,
      {
        "Content-Type": "application/json",
      }
    );

  


    if (saveResponse.status === false) {
      console.error("Failed to save notification:", saveResponse.statusText);
      return;
    }

  } catch (e) {
    console.error(`Error sending notification: ${e}`);
  }
}

export function requestPermissionWithAlert(onAllow, onDeny) {
  Alert.alert(
    "Notification Permission",
    "This app needs permission to send you notifications. Please grant it.",
    [
      {
        text: "Don't Allow",
        style: "cancel",
        onPress: async () => {
          await AsyncStorage.removeItem("expoPushToken");
          if (onDeny) onDeny();
        },
      },
      {
        text: "Allow",
        onPress: async () => {
          const token = await registerForPushNotificationsAsync();
          if (token) {
            if (onAllow) onAllow();
          } else {
            console.error("Failed to register for push notifications.");
            if (onDeny) onDeny();
          }
        },
      },
    ]
  );
}

// Set up listeners for receiving notifications
export function setupNotificationListeners() {
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {}
  );

  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {});

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}
