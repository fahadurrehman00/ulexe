import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ReviewCard from "./ReviewCard";
import { fonts } from "../../../utils/font";
import { styles } from "../../../utils/styles";

const ReviewsScreen = ({ route }) => {
  const { reviews } = route.params;

  return (
    <View style={internalStyles.container}>
      <ScrollView>
        {reviews.length > 0 ? (
          reviews.map((ele, index) => (
            <>
              <View style={styles.headingContainer}>
                <Text style={styles.mainSubTitle}>
                  You can read about our services from our customers.
                </Text>
              </View>
              <ReviewCard
                key={index}
                reviewerName={ele.reviewer_name}
                avatarInitials={ele.avatar_initials}
                postedTime={ele.created_at}
                reviewPoints={ele.rating}
                reviewMessage={ele.comment}
              />
            </>
          ))
        ) : (
          <View style={internalStyles.emptyContainer}>
            <Text style={styles.emptyResponseText}>No Reviews!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ReviewsScreen;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
