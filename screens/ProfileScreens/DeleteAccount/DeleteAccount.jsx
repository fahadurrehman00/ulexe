import React, { useState } from "react";
import { Text, View, Linking, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainButton from "../../../components/MainButton";
import PopupVerification from "../../../components/PopupVerification";
import { styles } from "../../../utils/styles";
import PasswordField from "../../../components/PasswordField";
import Toast from "react-native-toast-message";
import { SelectList } from "react-native-dropdown-select-list";
import { apiCall } from "../../../utils/api";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/font";

const DeleteAccount = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const handleDeleteAccount = async () => {
    if (!password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your password to proceed.",
      });
      return;
    }

    if (!selectedReason) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select a reason for deleting your account.",
      });
      return;
    }

    try {
      const response = await apiCall(
        `/delete/user`,
        "POST",
        JSON.stringify({ password })
      );

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.msg || "Account deleted successfully.",
        });

        navigation.navigate("Login");
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.msg || "Incorrect password. Please try again.",
        });
      }
    } catch (error) {
      console.error("Password verification error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while verifying your password.",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    setIsPopupVisible(false);

    try {
      const response = await apiCall(`/delete-account`, "DELETE", true);

      if (response.ok) {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("expires_in");

        Toast.show({
          type: "success",
          text1: "Account Deleted",
          text2: "Your account has been successfully deleted.",
        });

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        const data = await response.json();
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.msg || "Failed to delete account. Please try again.",
        });
      }
    } catch (error) {
      console.error("Account deletion error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while deleting your account.",
      });
    }
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  return (
    <View style={internalStyles.container}>
      <View>
        <Text style={internalStyles.heading}>
          We're sorry to see you leave!
        </Text>
        <Text style={styles.authDes}>
          Why are you wanting to delete your account? Can we change your mind?
          You can contact us through our email. {"\n"}
          <Text
            style={styles.email}
            onPress={() => Linking.openURL("mailto:email@abcaesthetics.com")}
          >
            email@abcaesthetics.com
          </Text>
          .
        </Text>
        <Text style={styles.authDes}>
          Are you certain you want to delete this account? Once deleted, you
          won't be able to recover its response.
        </Text>

        <View>
          <Text style={styles.inputLabel}>Reason</Text>
          <SelectList
            boxStyles={[styles.selectList, { marginBottom: 6 }]}
            dropdownStyles={styles.selectList}
            setSelected={setSelectedReason}
            data={[
              { key: "1", value: "Privacy Concerns" },
              { key: "2", value: "No Longer Needed" },
              { key: "3", value: "Found a Better Service" },
              { key: "4", value: "Other" },
            ]}
            save='value'
            placeholder='Select a reason'
            placeholderTextColor={colors.Neutrals300}
          />

          <PasswordField
            label='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            placeholder='Enter your password'
            placeholderTextColor={colors.Neutrals300}
          />
        </View>
      </View>

      <MainButton
        buttonText='Delete Account'
        onPress={handleDeleteAccount}
        customStyle={styles.errorButton}
      />

      {isPopupVisible && (
        <PopupVerification
          heading='Do you want to delete your account?'
          message='You cannot open this account again. It will be deleted permanently from the database.'
          cancelText='Cancel'
          confirmText='Yes, Delete'
          onCancel={handleCancel}
          onConfirm={handleDeleteConfirm}
          style={styles.errorButton}
        />
      )}

      <Toast />
    </View>
  );
};

export default DeleteAccount;
const internalStyles = StyleSheet.create({
  heading: {
    fontSize: 16,
    color: colors.BaseBlack,
    fontFamily: fonts.bold,
  },
  container: {
    flexGrow: 1,
    padding: 8,
    justifyContent: "space-between",
  },
});
