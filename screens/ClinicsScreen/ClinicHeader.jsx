import React from "react";
import { View, Image, Dimensions } from "react-native";
import AddressComponent from "./AddressComponent";
import { StyleSheet } from "react-native";
const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");

const ClinicHeader = ({ clinicDetails }) => {
  return (
    <View>
      <Image
        style={internalStyles.image}
        source={
          clinicDetails.clinicImage === ""
            ? require("../../assets/images/no-image.png")
            : { uri: clinicDetails.clinicImage }
        }
      />
      <View style={internalStyles.overlay}>
        <AddressComponent
          name={clinicDetails.clinicName}
          address={clinicDetails.address}
          rating={clinicDetails.rating}
          reviews={clinicDetails.reviews}
        />
      </View>
    </View>
  );
};

export default ClinicHeader;
const internalStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: deviceWidth,
    height: deviceHeight * 0.22,
    contentFit: "cover",
  },
});
