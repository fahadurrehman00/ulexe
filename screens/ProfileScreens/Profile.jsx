import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopupVerification from "../../components/PopupVerification";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/font";
import { apiCall } from "../../utils/api";

const Profile = ({ navigation }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignout = () => {
    setIsPopupVisible(true);
  };

  const handleSignoutConfirm = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        console.error("No token found for signout");
        setLoading(false);
        return;
      }

      const response = await apiCall(
        `/logout`,
        "POST",
        null,
        true,
        {},
        "token"
      );
      if (response.ok) {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("expires_in");
        await AsyncStorage.removeItem("profileImage");
        setLoading(false);
        navigation.navigate("Home");
      } else {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("expires_in");
        await AsyncStorage.removeItem("profileImage");
        navigation.navigate("Home");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error signing out:", error);
    }
  };

  const handleCancelSignout = () => {
    setIsPopupVisible(false);
  };

  return (
    <View style={internalStyles.container}>
      <View>
        {["Profile", "Change Password", "Privacy Policies"]
          .filter(Boolean)
          .map((text, index) => (
            <TouchableOpacity
              key={index}
              style={internalStyles.optionButton}
              onPress={() => {
                if (text === "Profile") {
                  navigation.navigate("EditProfile");
                } else if (text === "Change Password") {
                  navigation.navigate("ChangePassword");
                } else if (text === "Privacy Policies") {
                  navigation.navigate("PrivacyPolicy");
                }
              }}
            >
              <Text style={internalStyles.optionText}>{text}</Text>
              <MaterialIcons
                name='arrow-forward-ios'
                style={internalStyles.arrowIcon}
              />
            </TouchableOpacity>
          ))}

        <TouchableOpacity
          onPress={handleSignout}
          style={internalStyles.signoutButton}
        >
          <Text style={internalStyles.signoutText}>Sign Out</Text>
          <Feather name='log-out' style={internalStyles.signoutIcon} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={internalStyles.appVersionText}>
          App version 0.0.1 (11564)
        </Text>
      </View>

      {isPopupVisible && (
        <PopupVerification
          heading='Sign Out'
          message='Are you sure you want to sign out your account?'
          cancelText='Cancel'
          confirmText='Yes, Sign out'
          onCancel={handleCancelSignout}
          onConfirm={handleSignoutConfirm}
          style={internalStyles.dangerButton}
          isLoading={loading}
        />
      )}
    </View>
  );
};

export default Profile;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 24,
    justifyContent: "space-between",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.BaseWhite,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: colors.Neutrals100,
    borderWidth: 1,
  },
  optionText: {
    color: colors.BaseBlack,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  arrowIcon: {
    color: colors.BaseBlack,
    fontSize: 18,
  },
  settingSwitchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.BaseWhite,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Secondary200,
  },
  signoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.BaseWhite,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: colors.Secondary200,
  },
  signoutText: {
    color: colors.Error200,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  signoutIcon: {
    color: colors.Error200,
    fontSize: 18,
  },
  deleteAccountText: {
    textAlign: "center",
    color: colors.Error200,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  appVersionText: {
    textAlign: "center",
    color: colors.Neutrals500,
    fontFamily: fonts.regular,
    marginTop: 8,
    fontSize: 16,
  },
});
