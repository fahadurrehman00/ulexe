import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";
import MainButton from "./MainButton";
import { styles } from "../utils/styles";
import { fonts } from "../utils/font";
import { colors } from "../utils/colors";

import Icon from "react-native-vector-icons/Ionicons";
const ClinicCard = (props) => {
  const handleClinicView = () =>
    navigation.navigate("ClinicScreen", {
      id,
    });
  const { img, name, rating, reviews, address, id } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={internalStyles.cardContainer}
      onPress={handleClinicView}
    >
      <Image
        source={
          img === "" ? require("../assets/images/clinic.png") : { uri: img }
        }
        style={internalStyles.clinicImage}
      />

      <View style={internalStyles.infoContainer}>
        <Text style={styles.clinicCardTitle}>{name}</Text>
        <View style={internalStyles.ratingContainer}>
          <Rating rating={rating} reviews={reviews} size={12} star={5} />
          <Text
            style={[styles.paragraphText, !address && styles.emptyResponseText]}
            numberOfLines={1}
          >
            {address ? address : "No address available"}
          </Text>
        </View>
      </View>
      <View>
        <Icon name='chevron-forward' size={20} color={colors.Primary} />
      </View>
    </TouchableOpacity>
  );
};

const internalStyles = StyleSheet.create({
  cardContainer: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.Neutrals100,
  },
  clinicImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 99,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  clinicName: {
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  address: {
    fontFamily: fonts.medium,
  },
  ratingContainer: {
    marginTop: 4,
    gap: 2,
  },
});

export default ClinicCard;
