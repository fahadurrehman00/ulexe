import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/font";
import { Image } from "expo-image";

const CategoryCard = ({
  ServiceCardTitle,
  ServiceImage,
  customServiceCard,
  customServiceScreenImage,
  customServiceTitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardContainer, customServiceCard]}
    >
      <Image
        style={[styles.cardImage, customServiceScreenImage]}
        source={
          ServiceImage === ""
            ? require("../../../assets/images/no-image.png")
            : { uri: ServiceImage }
        }
        cachePolicy='memory'
        transition={500}
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.cardTitle, customServiceTitle]}>
          {ServiceCardTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.White,
    borderColor: colors.Primary100,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "70%",
  },
  titleContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    padding: 4,
    fontSize: 14,
    fontFamily: fonts.medium,
    textAlign: "center",
  },
});
