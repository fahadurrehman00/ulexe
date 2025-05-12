import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fonts } from "../utils/font";
import { colors } from "../utils/colors";

const Price = ({ details, customTextPrice }) => {
  const formatPrice = (price) => (price ? parseFloat(price).toFixed(0) : "0");

  return (
    <>
      {details.serviceName === "Free Consultation" ? (
        <Text style={internalStyles.servicePrice}>$0</Text>
      ) : details.hasPromotion ? (
        <View style={internalStyles.priceContainer}>
          <Text style={internalStyles.strikethrough}>
            ${formatPrice(details.price)}
          </Text>
          <Text style={[internalStyles.servicePrice, customTextPrice]}>
            {" "}
            $
            {details.discountType === "percentage"
              ? formatPrice(details.price * (1 - details.discount / 100))
              : formatPrice(details.price - details.discount)}
          </Text>
        </View>
      ) : (
        <Text style={[internalStyles.servicePrice, customTextPrice]}>
          $
          {details?.priceRange
            ? formatPrice(details.price)
            : `${formatPrice(details.minPrice)} to $${formatPrice(
                details.maxPrice
              )}`}
        </Text>
      )}
    </>
  );
};

export default Price;

const internalStyles = StyleSheet.create({
  strikethrough: {
    fontSize: 12,
    fontFamily: fonts.medium,
    textDecorationLine: "line-through",
    color: colors.Neutrals400,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  servicePrice: {
    fontFamily: fonts.semiBold,
    color: colors.Primary,
    fontSize: 14,
  },
});
