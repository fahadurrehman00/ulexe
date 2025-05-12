import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  Linking,
} from "react-native";
import * as Notifications from "expo-notifications";
import { apiCall } from "../../utils/api";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/font";
import EmptyNotification from "../../assets/images/noNotification.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PopupVerification from "../../components/PopupVerification";
import { useFocusEffect } from "@react-navigation/native";
import MainButton from "../../components/MainButton";

const Notification = () => {
  const [readNotifications, setReadNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [notificationsToken, setNotificationsToken] = useState(null);

  useFocusEffect(
    useCallback(() => {
      registerForNotifications();
      fetchNotifications();
      return;
    }, [fetchNotifications])
  );

  useEffect(() => {
    if (isNotificationsEnabled && notificationsToken) {
      handleNotifications(true, notificationsToken);
    }
  }, [isNotificationsEnabled, notificationsToken]);
  async function registerForNotifications() {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });

    if (status === "granted") {
      setIsNotificationsEnabled(true);
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setNotificationsToken(token);

      // Run the notification settings API
      handleNotifications(true, token);
    } else {
      setIsPopupVisible(true);
      setIsNotificationsEnabled(false);
      setNotificationsToken(null);
    }
  }
  const handleNotifications = async (allow, token) => {
    try {
      const payload = {
        allow_notifications: allow ? 1 : 0,
        notifications_token: allow ? token : "",
      };

      const response = await apiCall(
        `/notifications/settings`,
        "POST",
        payload
      );

      if (response?.status === true) {
        console.log("Notification settings updated:", response);
      } else {
        console.log("Failed to update notification settings:", response);
      }
    } catch (error) {
      console.log("Error updating notification settings:", error);
    }
  };

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await apiCall(`/get/notifications`, "GET");
      if (!response || response.status === false) {
        throw new Error(response?.msg || "Failed to fetch notifications");
      }

      const notificationsData = Array.isArray(response.data)
        ? response.data
        : [];

      // Separate read and unread notifications
      const readNotificationsData = notificationsData.filter(
        (notification) => notification.status === "read"
      );
      const unreadNotificationsData = notificationsData.filter(
        (notification) => notification.status === "unread"
      );

      setReadNotifications(readNotificationsData);
      setUnreadNotifications(unreadNotificationsData);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClosePopup = () => setIsPopupVisible(false);
  const handleOpenSettings = () => {
    Linking.openSettings();
    setIsPopupVisible(false);
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await apiCall(
        `/notifications/${notificationId}/mark-as-read`,
        "PUT"
      );

      if (!response || response.status === false) {
        throw new Error(response?.msg || "Failed to mark notification as read");
      }

      const notification = unreadNotifications.find(
        (notification) => notification.id === notificationId
      );

      if (notification) {
        setUnreadNotifications((prevUnread) =>
          prevUnread.filter((n) => n.id !== notificationId)
        );
        setReadNotifications((prevRead) => [
          ...prevRead,
          { ...notification, status: "read" },
        ]);
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      Alert.alert(
        "Error",
        "Failed to mark notification as read. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#000' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={internalStyles.notificationScreen}>
        <Text style={internalStyles.errorText}>
          Failed to load notifications: {error}
        </Text>
      </View>
    );
  }

  if (readNotifications.length === 0 && unreadNotifications.length === 0) {
    return (
      <View style={internalStyles.notificationScreen}>
        <View style={internalStyles.emptyNotificationScreen}>
          <EmptyNotification width={"100%"} height={200} />
          <Text style={internalStyles.notificationText}>
            No notifications yet!
          </Text>
        </View>
        {isPopupVisible && (
          <PopupVerification
            heading='Notification Permission'
            message='You need to enable notifications to use this feature.'
            cancelText='Dont Allow'
            confirmText='Allow'
            onCancel={handleClosePopup}
            onConfirm={handleOpenSettings}
            style={internalStyles.allowButton}
            isLoading={loading}
          />
        )}
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => markAsRead(item.id)}
      style={[
        internalStyles.notificationContainer,
        item.status === "read"
          ? internalStyles.readNotification
          : internalStyles.unreadNotification,
      ]}
    >
      <View style={internalStyles.notificationContent}>
        <Text style={internalStyles.notificationTitle}>{item.title}</Text>
        <Text style={internalStyles.notificationDetail}>{item.message}</Text>
      </View>
      <View>
        <MainButton
          customStyle={styles.detailsButton}
          customeTextStyle={styles.detailsButtonText}
          buttonText='See Details'
        />
      </View>
    </TouchableOpacity>
  );

  const sections = [];

  if (unreadNotifications.length > 0) {
    sections.push({
      title: "Click to read notifications",
      data: unreadNotifications,
    });
  }

  if (readNotifications.length > 0) {
    sections.push({
      title: "Read",
      data: readNotifications,
    });
  }

  return (
    <View style={internalStyles.notificationScreen}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={internalStyles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const internalStyles = StyleSheet.create({
  notificationScreen: {
    padding: wp("4%"),
    backgroundColor: colors.BaseWhite,
    height: "100%",
  },
  emptyNotificationScreen: {
    flex: 1,
    marginBottom: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    marginTop: hp("5%"),
    fontSize: wp("4%"),
    color: colors.Neutrals500,
    fontFamily: fonts.regular,
  },
  notificationContainer: {
    padding: wp("3%"),
    backgroundColor: colors.BaseWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: wp("2.5%"),
    shadowColor: colors.Neutrals500,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.Secondary100,
    marginBottom: 15,
  },
  notificationContent: {
    marginRight: wp("2.5%"),
    flex: 1,
  },
  notificationTitle: {
    fontFamily: fonts.medium,
    marginBottom: hp("0.625%"),
    fontSize: wp("4%"),
  },
  notificationDetail: {
    fontSize: wp("3.5%"),
    color: colors.Neutrals500,
    fontFamily: fonts.regular,
  },
  readNotification: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    opacity: 0.5,
  },
  unreadNotification: {
    backgroundColor: "#fff",
    opacity: 1,
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  sectionHeader: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginVertical: hp("2%"),
  },
  errorText: {
    color: colors.Error200,
    marginBottom: 20,
  },
  allowButton: {
    backgroundColor: colors.Primary,
  },
});

export default Notification;
