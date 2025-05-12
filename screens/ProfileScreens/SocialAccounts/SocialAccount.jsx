import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MainButton from "../../../components/MainButton";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/font";

const SocialAccounts = () => {
  const navigation = useNavigation();

  const [facebookConnected, setFacebookConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);

  const handleToggleFacebook = () => {
    setFacebookConnected(!facebookConnected);
  };

  const handleToggleGoogle = () => {
    setGoogleConnected(!googleConnected);
  };

  return (
    <View style={internalStyles.container}>
      <View style={{ padding: 16 }}>
        {/* Heading */}
        <View style={internalStyles.authContainer}>
          <Text style={internalStyles.secondHeading}>Link Social Accounts</Text>

          {/* Paragraph */}
          <Text style={internalStyles.authDes}>
            Securely connect your social accounts to the Ulexe Aesthetic for
            data protection and seamless integration.
          </Text>
        </View>

        {/* Facebook Button */}
        <TouchableOpacity style={internalStyles.linkButton}>
          <View style={internalStyles.socialButtonContent}>
            <Image
              source={require("../../../assets/images/facebook.png")}
              style={internalStyles.socialIcon}
            />
            <View>
              <Text style={internalStyles.secondHeading}>Facebook</Text>
              <Text style={internalStyles.socialStatus}>
                {facebookConnected ? "Connected" : "Not connected"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              internalStyles.toggleButton,
              facebookConnected
                ? internalStyles.connected
                : internalStyles.notConnected,
            ]}
            onPress={handleToggleFacebook}
          >
            <View
              style={[
                internalStyles.toggleCircle,
                facebookConnected
                  ? internalStyles.toggleCircleConnected
                  : internalStyles.toggleCircleNotConnected,
              ]}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity style={internalStyles.linkButton}>
          <View style={internalStyles.socialButtonContent}>
            <Image
              source={require("../../../assets/images/google.png")}
              style={internalStyles.socialIcon}
            />
            <View>
              <Text style={internalStyles.secondHeading}>Google</Text>
              <Text style={internalStyles.socialStatus}>
                {googleConnected ? "Connected" : "Not connected"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              internalStyles.toggleButton,
              googleConnected
                ? internalStyles.connected
                : internalStyles.notConnected,
            ]}
            onPress={handleToggleGoogle}
          >
            <View
              style={[
                internalStyles.toggleCircle,
                googleConnected
                  ? internalStyles.toggleCircleConnected
                  : internalStyles.toggleCircleNotConnected,
              ]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Done Button */}
      <View style={internalStyles.mainButtonContainer}>
        <MainButton buttonText='Done' onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default SocialAccounts;

const internalStyles = StyleSheet.create({
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.White,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Neutrals100,
  },
  socialButtonContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  socialStatus: {
    color: colors.Neutrals400,
    fontFamily: fonts.medium,
  },
  toggleButton: {
    width: 40,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 3,
  },
  connected: {
    backgroundColor: colors.BaseBlack,
  },
  notConnected: {
    backgroundColor: colors.Neutrals500,
  },
  toggleCircle: {
    width: 12,
    height: 12,
    backgroundColor: colors.BaseWhite,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  toggleCircleConnected: {
    transform: [{ translateX: 20 }],
  },
  toggleCircleNotConnected: {
    transform: [{ translateX: 0 }],
  },
});
