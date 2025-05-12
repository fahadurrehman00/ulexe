import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import SocialMediaLogin from "../SocialMediaLogin";
import MainButton from "../../../components/MainButton";
import { styles } from "../../../utils/styles";
import SplashLogo from "../../../assets/images/Ulexe.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const Welcome = () => {
  const navigation = useNavigation();
  const logoWidth = width * 0.6;
  const logoHeight = height * 0.1;
  return (
    <SafeAreaView style={internalStyles.welcomeContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={internalStyles.logoContainer}>
          <SplashLogo width={logoWidth} height={logoHeight} />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/onboarding4.png")}
            style={internalStyles.welcomeImage}
          />
        </View>
        <View>
          <SocialMediaLogin
            facebookText='Login with facebook'
            googleText='Login with google'
          />
          <MainButton
            buttonText='Continue with Email Address'
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
const internalStyles = StyleSheet.create({
  welcomeImage: {
    height: hp("48%"),
    width: wp("100%"),
    resizeMode: "contain",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    padding: wp("4%"),
    gap: hp("1.25%"),
  },
  logoContainer: {
    paddingTop: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: wp("5%"),
  },
});
