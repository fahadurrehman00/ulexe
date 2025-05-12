import React from "react";
import { View, StyleSheet } from "react-native";
import SplashLogo from "../../../assets/images/Ulexe1.svg";
const Splash = () => {
  return (
    <View style={internalStyles.splashContainer}>
      <View style={internalStyles.splashLogoContainer}>
        <SplashLogo height={400} width={260} />
      </View>
    </View>
  );
};

export default Splash;
const internalStyles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
  },
  splashLogoContainer: {
    alignItems: "center",
    marginBottom: 160,
  },
});
