import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fonts } from "../utils/font";
import PrimaryStar from "../assets/images/star.svg";
import GreyStar from "../assets/images/star1.svg";
import { styles } from "../utils/styles";

const Rating = ({ rating, reviews, size, star, noOfReviews, textColor }) => {
  return (
    <>
      {rating > 0 ? (
        <View style={internalStyles.ratingRow}>
          <View style={internalStyles.ratingStars}>
            {[...Array(star)].map((_, i) =>
              i < Math.round(rating) ? (
                <PrimaryStar key={i} height={size} width={size} />
              ) : (
                <GreyStar key={i} height={size} width={size} />
              )
            )}
          </View>
          <Text style={[styles.mainSubTitle, textColor]}>
            {parseFloat(rating).toFixed(1)}
          </Text>
          {!noOfReviews && (
            <Text style={[styles.mainSubTitle, textColor]}>({reviews})</Text>
          )}
        </View>
      ) : (
        <Text style={[styles.emptyResponseText, textColor]}> 0 Reviews</Text>
      )}
    </>
  );
};

export default Rating;

const internalStyles = StyleSheet.create({
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontFamily: fonts.medium,
  },
  reviewCount: {
    fontFamily: fonts.medium,
  },
});
