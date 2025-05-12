import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import MainButton from "../../../components/MainButton";
import { colors } from "../../../utils/colors";
import { styles } from "../../../utils/styles";
import { Image } from "expo-image";
import Price from "../../../components/Price";

const PromotionsCard = ({ serviceDetails, onPress }) => {
  return (
    <TouchableOpacity style={internalStyles.cardContainer} onPress={onPress}>
      <Image
        source={
          serviceDetails.image === ""
            ? require("../../../assets/images/no-image.png")
            : { uri: serviceDetails.serviceImage }
        }
        style={internalStyles.cardImage}
      />
      <View style={styles.floatingPrice}>
        <Price details={serviceDetails} />
      </View>
      <View style={internalStyles.cardTextContainer}>
        <View>
          <Text style={[styles.clinicCardTitle, { marginBottom: 4 }]}>
            {serviceDetails.serviceName}
          </Text>
          <Text style={styles.smallSubTitle}>{serviceDetails.clinicName}</Text>
        </View>
        <MainButton
          customStyle={styles.detailsButton}
          customeTextStyle={styles.detailsButtonText}
          buttonText={
            serviceDetails.clinicPlan === "free" ? "Call Now" : "Book Now"
          }
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PromotionsCard;

const internalStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: colors.Neutrals100,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.Primary100,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 130,
    contentFit: "cover",
  },
  cardTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
