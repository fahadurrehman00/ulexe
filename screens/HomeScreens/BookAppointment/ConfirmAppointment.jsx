import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { colors } from "../../../utils/colors";
import MainButton from "../../../components/MainButton";
import { fonts } from "../../../utils/font";
import { styles } from "../../../utils/styles";
import { apiCall } from "../../../utils/api";
import Toast from "react-native-toast-message";
import Price from "../../../components/Price";
import SeeClinicCard from "../../../components/SeeClinicCard";

const ConfirmAppointment = ({ navigation, route }) => {
  const {
    price,
    date,
    time,
    teamId,
    clinicId,
    serviceId,
    description,
    formattedDate,
    serviceDetails,
    professionalName,
  } = route.params;
  const handleConfirmBooking = async () => {
    const payload = {
      serviceDetails,
      clinic_id: clinicId,
      team_id: teamId,
      service_id: serviceId,
      booking_date: formattedDate,
      booking_time: `${time}:00`,
      description: description,
      price: serviceDetails.price,
      use_price_range: serviceDetails.priceRange,
      min_price: serviceDetails.minPrice,
      max_price: serviceDetails.maxPrice,
      discount_type: serviceDetails.discountType,
      discount_value: serviceDetails.discount,
      has_promotion: serviceDetails.hasPromotion,
    };
    try {
      const response = await apiCall(
        `/bookings`,
        "POST",
        payload,
        true,
        {},
        "token"
      );

      if (response.status === "Error") {
        if (response?.errors?.booking_time) {
          showToast("error", "Error", response?.errors?.booking_time);
          return;
        }
        showToast("error", "Error", response.msg);
      } else {
        showToast(
          "success",
          "Booking Successfully",
          "Your appointment have been booked successfully"
        );
        setTimeout(() => {
          navigation.navigate("ConfirmedAppointment", {
            serviceDetails,
            price,
            date,
            time,
            professionalName,
            description,
          });
        }, 2000);
      }
    } catch (error) {
      showToast(
        "error",
        "Booking Error",
        "Failed to confirm the booking. Please try again."
      );
    }
  };
  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 1000,
      autoHide: true,
      topOffset: 10,
    });
  };

  const formatBookingDate = (formattedDate) => {
    const [year, month, day] = formattedDate.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dateObj = new Date(year, month - 1, day);
    const weekdayName = weekdays[dateObj.getDay()];
    const monthName = monthNames[month - 1];
    return `${weekdayName} ${day} ${monthName}`;
  };

  return (
    <KeyboardAvoidingView
      style={internalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={internalStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={internalStyles.contentContainer}>
            <SeeClinicCard clinic={serviceDetails} />
            <View style={styles.detailsHeader}>
              <Text style={styles.smallTitle}>Appointment Details:</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.cardTitle}>Service:</Text>
              <Text style={styles.mainSubTitle}>
                {serviceDetails.serviceName}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.cardTitle}>Price:</Text>
              <Price details={serviceDetails} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.cardTitle}>Professional:</Text>
              <Text style={styles.mainSubTitle}>{professionalName}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.cardTitle}>Date & Time:</Text>
              <Text style={styles.mainSubTitle}>
                {formatBookingDate(formattedDate)}, {time}
              </Text>
            </View>
            {description ? (
              <View style={styles.detailsDescription}>
                <Text style={styles.cardTitle}>Description:</Text>
                <Text
                  style={[
                    styles.paragraphText,
                    !description && styles.emptyResponseText,
                  ]}
                >
                  Description not added to booking!
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.mainButtonContainer}>
          <MainButton
            buttonText='Confrim Booking'
            onPress={handleConfirmBooking}
          />
        </View>
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
};

const internalStyles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
  },
};

export default ConfirmAppointment;
