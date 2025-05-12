import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { fonts } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { TouchableOpacity } from "react-native";
import { styles } from "../../../utils/styles";

const AboutScreen = ({ route }) => {
  const { about: clinicInfo } = route.params;

  const formatePhoneNumber = (country_code, phone) => {
    if (!phone) return "Phone number not available";
    return `(${country_code}) ${phone.slice(0, 3)} ${phone.slice(
      3,
      6
    )} ${phone.slice(6)}`;
  };
  const [showFullText, setShowFullText] = useState(false);
  const toggleTextShown = () => setShowFullText(!showFullText);

  const maxChar = 150;
  const description = clinicInfo.description
    ? clinicInfo.description
    : "Nothing added yet";
  const shouldTruncate = description.length > maxChar;
  return (
    <View style={internalStyles.aboutClinicSafeArea}>
      <ScrollView>
        {clinicInfo.description ? (
          <View style={internalStyles.contentContainer}>
            <Text
              style={[
                styles.cardService,
                !clinicInfo.description && styles.emptyResponseText,
              ]}
            >
              {shouldTruncate && !showFullText
                ? `${description.substring(0, maxChar)}...`
                : description}
              {shouldTruncate && (
                <TouchableOpacity onPress={toggleTextShown}>
                  <Text
                    style={[
                      styles.mainSubTitle,
                      !clinicInfo.description && styles.emptyResponseText,
                    ]}
                  ></Text>
                  <Text style={styles.smallTitle}>{showFullText ? "See less" : "See more"}</Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
        ) : (
          ""
        )}
        <View style={internalStyles.contentContainer}>
          <Text style={styles.mainTitle}>Contact:</Text>
          <View style={internalStyles.aboutClinicContactItem}>
            <AntDesign name='phone' size={24} color='black' />
            <Text
              style={[
                styles.mainSubTitle,
                !clinicInfo.phone && styles.emptyResponseText,
              ]}
              onPress={() => {
                clinicInfo.phone &&
                  Linking.openURL(
                    `tel:${clinicInfo.country_code}${clinicInfo.phone}`
                  );
              }}
            >
              {formatePhoneNumber(clinicInfo.country_code, clinicInfo.phone)}
            </Text>
          </View>

          <View style={internalStyles.aboutClinicContactItem}>
            <AntDesign name='instagram' size={24} color='black' />
            <Text
              style={[
                styles.mainSubTitle,
                !clinicInfo.instagram && styles.emptyResponseText,
              ]}
              onPress={() => {
                clinicInfo.instagram && Linking.openURL(clinicInfo.instagram);
              }}
            >
              {clinicInfo.instagram
                ? clinicInfo.instagram
                : "Instagram account not available!"}
            </Text>
          </View>
          <View style={internalStyles.aboutClinicContactItem}>
            <MaterialCommunityIcons name='web' size={24} color='black' />
            <Text
              style={[
                styles.mainSubTitle,
                !clinicInfo.website && styles.emptyResponseText,
              ]}
              onPress={() => {
                clinicInfo.website && Linking.openURL(clinicInfo.website);
              }}
            >
              {clinicInfo.website
                ? clinicInfo.website
                : "Website not available!"}
            </Text>
          </View>
        </View>
        <View style={internalStyles.contentContainer}>
          <Text style={styles.mainTitle}>Address:</Text>
          <Text
            style={[
              styles.cardService,
              !clinicInfo.address && styles.emptyResponseText,
            ]}
          >
            {clinicInfo.address ? clinicInfo.address : "Address not added yet."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const internalStyles = StyleSheet.create({
  aboutClinicSafeArea: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.BaseWhite,
  },
  contentContainer: {
    marginBottom: 12,
    gap: 8,
  },
  aboutClinicContactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default AboutScreen;
