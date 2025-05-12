import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "../utils/styles";
import Rating from "./Rating";
import Price from "./Price";
import { colors } from "../utils/colors";

const FloatingContent = ({ data, screenType }) => {
  return (
    <View style={styles.floatingContent}>
      <View>
        {data.rating ? (
          data.rating.length > 1 && (
            <View style={internalStyles.ratingContainer}>
              <Rating
                textColor={internalStyles.ratingColor}
                rating={data.rating}
                noOfReviews
                size={14}
              />
            </View>
          )
        ) : (
          <View></View>
        )}
      </View>
      {screenType === "results" ? null : (
        <View style={internalStyles.floatingPrice}>
          <Price details={data} />
        </View>
      )}
    </View>
  );
};

export default FloatingContent;

const internalStyles = StyleSheet.create({
  ratingContainer: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "rgba(79, 79, 79, 0.95)",
  },
  floatingPrice: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  ratingColor: {
    color: colors.White,
  },
});
