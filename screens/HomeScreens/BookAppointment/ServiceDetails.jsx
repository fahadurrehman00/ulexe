import { Linking, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MainButton from "../../../components/MainButton";
import { colors } from "../../../utils/colors";
import { Image } from "expo-image";
import Price from "../../../components/Price";
import { styles } from "../../../utils/styles";
import SeeClinicCard from "../../../components/SeeClinicCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceDetails = ({ navigation, route }) => {
  const { service } = route.params;
  const [checkAuth, setCheckAuth] = useState(false);

  const checkAuthStatus = async () => {
    token = await AsyncStorage.getItem("refresh_token");
    setCheckAuth(token);
  };

  useEffect(() => {
    const phoneNumber = service.clinicPhone;
    checkAuthStatus();
  }, [checkAuth]);
  return (
    <View style={internalStyles.container}>
      <View style={internalStyles.contentContainer}>
        <SeeClinicCard clinic={service} />
        <View>
          <Image
            style={internalStyles.serviceImage}
            source={
              service.serviceImage === ""
                ? require("../../../assets/images/no-image.png")
                : { uri: service.serviceImage }
            }
          />
          {service.hasPromotion && (
            <Text style={styles.floatingDiscount}>
              {service.discountType === "percentage"
                ? `${String(service.discount).split(".")[0]}% OFF`
                : `$${String(service.discount).split(".")[0]} OFF`}
            </Text>
          )}
        </View>
        <View style={internalStyles.serviceRow}>
          <Text style={styles.clinicCardTitle}>{service.serviceName}</Text>
          <Price details={service} />
        </View>
        {service.description ? (
          <View style={internalStyles.description}>
            <Text style={styles.clinicCardTitle}>Description</Text>
            <Text
              style={[
                styles.paragraphText,
                !service.description && styles.emptyResponseText,
              ]}
            >
              {service.description
                ? service.description
                : "Description not available"}
            </Text>
          </View>
        ) : (
          ""
        )}
      </View>
      <View style={styles.mainButtonContainer}>
        <MainButton
          buttonText={
            service.clinicPlan === "free" ? "Call Now" : "Book Appointment"
          }
          onPress={async () => {
            if (service.clinicPlan === "free" && checkAuth) {
              const phoneNumber = service.clinicPhone;
              if (phoneNumber) {
                Linking.openURL(`tel:${phoneNumber}`);
              } else {
                console.error("No phone number available for this clinic.");
              }
            } else if (checkAuth) {
              navigation.navigate("BookAppointment", {
                service,
              });
            } else {
              await AsyncStorage.setItem(
                "previousService",
                JSON.stringify(service)
              );
              await AsyncStorage.setItem("previousScreen", "ServiceDetails");
              navigation.navigate("Signup");
            }
          }}
        />
      </View>
    </View>
  );
};

export default ServiceDetails;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    padding: 8,
  },
  serviceImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.Primary100,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  description: {
    padding: 10,
    borderRadius: 10,
    gap: 6,
    backgroundColor: colors.Neutrals100,
  },
});
