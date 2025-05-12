import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/font";
import Rating from "../../../components/Rating";
import { styles } from "../../../utils/styles";

const ReviewCard = ({
  reviewerName,
  avatarInitials,
  postedTime,
  reviewPoints,
  reviewMessage,
}) => {
  return (
    <View style={internalStyles.reviewCard}>
      <View style={internalStyles.avatarNameContainer}>
        <Text style={internalStyles.avatarNameText}>{avatarInitials}</Text>
      </View>
      <View style={internalStyles.reviewInfo}>
        <View style={internalStyles.reviewsHeader}>
          <Text style={styles.cardTitle}>{reviewerName}</Text>
          <Rating rating={reviewPoints} size={17} noOfReviews={true} star={5} />
        </View>
        {postedTime && <Text style={styles.contentText}>{postedTime}</Text>}
        <View style={internalStyles.reviewCardMessageContainer}>
          <Text style={styles.mainSubTitle}>{reviewMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const internalStyles = StyleSheet.create({
  reviewCard: {
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: "row",
    gap: 8,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.Neutrals100,
  },
  avatarNameContainer: {
    backgroundColor: colors.Primary100,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarNameText: {
    color: colors.Primary,
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  reviewCardMessageContainer: {
    marginTop: 2,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewInfo: {
    width: "84%",
  },
});
