import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../utils/styles";

const SeeClinicCard = ({ clinic }) => {
  const navigation = useNavigation();
  const handleClinicView = () => {
    navigation.navigate("ClinicScreen", {
      id: clinic.clinicId,
    });
  };
  return (
    <TouchableOpacity
      style={internalStyles.clinicInfo}
      onPress={handleClinicView}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Image
          source={
            clinic.clinicImage === ""
              ? require("../assets/images/no-image.png")
              : { uri: clinic.clinicImage }
          }
          style={internalStyles.clinicImage}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.clinicCardTitle}>{clinic.clinicName}</Text>
          <View style={internalStyles.ratingContainer}>
            <Rating
              rating={clinic.rating}
              reviews={clinic.reviews}
              size={14}
              star={5}
            />
            <Text
              style={[
                styles.paragraphText,
                (!clinic.address ||
                  clinic.address === "Address not available") &&
                  styles.emptyResponseText,
              ]}
              numberOfLines={1}
            >
              {clinic.address && clinic.address.length > 40
                ? `${clinic.address.substring(0, 40)}...`
                : clinic.address || "Address not available"}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Icon name='chevron-forward' size={20} color={colors.Primary} />
      </View>
    </TouchableOpacity>
  );
};

export default SeeClinicCard;

const internalStyles = StyleSheet.create({
  clinicInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.White,
    borderColor: colors.Primary100,
  },
  clinicImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  ratingContainer: {
    marginTop: 4,
    gap: 2,
  },
});
