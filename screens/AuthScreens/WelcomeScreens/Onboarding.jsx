import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../../../utils/styles";

const Onboarding = ({ imageSource, title, subtitle }) => {
  return (
    <View>
      <Image source={imageSource} style={styles.onboardImage} />
      <View style={styles.onboardTextContainer}>
        <Text style={styles.onboardTitle}>{title}</Text>
        <Text style={styles.onboardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default Onboarding;
