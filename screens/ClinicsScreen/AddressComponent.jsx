import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
} from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/font";
import Icon from "react-native-vector-icons/Ionicons";
import Rating from "../../components/Rating";
import { styles } from "../../utils/styles";

const AddressComponent = ({ address, rating, reviews }) => {
  const handleAddressClick = () => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps?q=${encodedAddress}`;

    Linking.openURL(url)
      .then(() => {})
      .catch((err) => {
        Alert.alert("Error", "Error opening map: " + err.message);
      });
  };

  return (
    <View style={internalStyles.container}>
      <TouchableOpacity onPress={handleAddressClick}>
        <View style={internalStyles.addressRow}>
          <Icon name='location-outline' size={16} color={colors.White} />
          <Text
            style={[
              internalStyles.addressTitle,
              address === "Address not available" && styles.emptyResponseText,
              { color: colors.White },
            ]}
            numberOfLines={1}
          >
            {address && address.length > 45
              ? `${address.substring(0, 45)}...`
              : address || ""}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Rating container */}
      <Rating
        rating={rating}
        reviews={reviews}
        size={14}
        star={1}
        textColor={internalStyles.ratingText}
      />
    </View>
  );
};

export default AddressComponent;

const internalStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(79, 79, 79, 0.85)",
    paddingHorizontal: 8,
    height: 40,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addressTitle: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.White,
  },
  ratingText: {
    fontSize: 14,
    color: colors.White,
  },
});
