import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";
import { styles } from "../utils/styles";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import FloatingContent from "./FloatingContent";

const BookingCard = ({ navigation, statusColor, bookingDetails }) => {
  const handleButtonPress = () => {
    navigation.navigate("AppointmentDetails", {
      bookingDetails,
    });
  };
  return (
    <TouchableOpacity
      style={internalStyles.cardContainer}
      onPress={handleButtonPress}
    >
      <View>
        <Image
          source={
            bookingDetails.imageSource === ""
              ? require("../assets/images/no-image.png")
              : { uri: bookingDetails.imageSource }
          }
          style={internalStyles.cardImage}
        />
        <FloatingContent data={bookingDetails} />
      </View>
      <Text
        style={[
          styles.floatingDiscount,
          {
            color: statusColor,
            borderColor: statusColor,
          },
        ]}
      >
        {bookingDetails.status}
      </Text>
      <View style={internalStyles.cardTextContainer}>
        <View>
          <Text style={styles.clinicCardTitle}>{bookingDetails.title}</Text>
          <View style={internalStyles.detailCard}>
            <Text style={styles.smallSubTitle}>
              {bookingDetails.serviceName}
            </Text>
            <Text style={styles.smallSubTitle}>{bookingDetails.date}</Text>
          </View>
        </View>
        <Icon name='chevron-forward' size={20} color={colors.Primary} />
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;

const internalStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: colors.White,
    borderColor: colors.Primary100,
  },
  cardImage: {
    width: "100%",
    height: 135,
    contentFit: "cover",
  },
  cardTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  detailCard: {
    gap: 2,
    marginTop: 4,
  },
});
