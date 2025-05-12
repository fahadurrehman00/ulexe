import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { fonts } from "../utils/font";
import { colors } from "../utils/colors";
import { Image } from "expo-image";
import { styles } from "../utils/styles";
import FloatingContent from "./FloatingContent";

const ResultCard = ({ onPress, serviceDetails, screenType }) => {
  return (
    <TouchableOpacity onPress={onPress} style={internalStyles.resultsContainer}>
      <View>
        <Image
          style={internalStyles.resultImage}
          source={
            screenType === "service" && serviceDetails.serviceImage
              ? { uri: serviceDetails.serviceImage }
              : screenType === "service" && !serviceDetails.serviceImage
              ? require("../assets/images/no-image.png")
              : screenType != "service" && serviceDetails.clinicImage
              ? { uri: serviceDetails.clinicImage }
              : require("../assets/images/no-image.png")
          }
        />
        <FloatingContent data={serviceDetails} screenType={screenType} />
      </View>

      <View style={internalStyles.resultContent}>
        <Text
          style={[styles.clinicCardTitle, { marginBottom: 4 }]}
          numberOfLines={1}
        >
          {screenType === "service"
            ? serviceDetails.serviceName
            : serviceDetails.clinicName}
        </Text>

        <Text style={[styles.smallSubTitle]} numberOfLines={1}>
          {screenType === "service"
            ? serviceDetails.clinicName
            : serviceDetails.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ResultCard;

const internalStyles = StyleSheet.create({
  resultsContainer: {
    width: "48.5%",
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: colors.White,
    shadowColor: colors.Neutrals200,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.Primary100,
  },
  resultImage: {
    width: "100%",
    height: 110,
    contentFit: "cover",
  },
  resultContent: {
    flex: 1,
    padding: 8,
  },
});
