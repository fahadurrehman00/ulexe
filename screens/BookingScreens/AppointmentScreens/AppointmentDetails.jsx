import React from "react";
import Toast from "react-native-toast-message";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { colors } from "../../../utils/colors";
import { TouchableOpacity } from "react-native";
import { styles } from "../../../utils/styles";
import useGetAppDetails from "../../../helpers/Hooks/useGetAppDetails";
import Rating from "../../../components/Rating";
import MainButton from "../../../components/MainButton";
import BookingContent from "../../../components/BookingContent";
import AppDetailsSkeleton from "../../../components/Skeletons/AppDetailsSkeleton";

const { height: deviceHeight } = Dimensions.get("window");

const AppointmentDetails = ({ navigation, route }) => {
  const { bookingDetails, booking } = route.params || {};
  const { loading, appointmentData, status } = useGetAppDetails({
    bookingId: bookingDetails ? bookingDetails.id : booking.id,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "#EDA145";
      case "Cancelled":
        return "#C03744";
      case "Completed":
        return "#15B097";
      default:
        return "#A9A9A9";
    }
  };

  const getButtonLabel = (status) => {
    switch (status) {
      case "Upcoming":
        return "Cancel Appointment";
      case "Completed":
        return appointmentData.feedbackGiven
          ? "Book Again"
          : "Provide Feedback";
      case "Cancelled":
        return "Book Again";
      default:
        return "Action";
    }
  };

  const handleNavigate = (screen, data) => {
    navigation.navigate(screen, data);
  };

  const renderButtonAction = (status) => {
    switch (status) {
      case "Upcoming":
        return () =>
          handleNavigate("CancellationReason", {
            bookingId: bookingDetails.id,
          });
      case "Completed":
        return () =>
          appointmentData.feedbackGiven
            ? handleNavigate("ClinicScreen", {
                id: appointmentData.clinicId,
              })
            : handleNavigate("Feedback", {
                appointmentData,
              });
      case "Cancelled":
        return () => handleNavigate("Services", { id: appointmentData.catId });
      default:
        return () => {};
    }
  };

  if (loading) {
    return <AppDetailsSkeleton />;
  }

  const statusColor = getStatusColor(status);
  const buttonLabel = getButtonLabel(status);
  const buttonAction = renderButtonAction(status);

  const handleViewClinic = () => {
    navigation.navigate("ClinicScreen", { id: appointmentData.clinicId });
  };

  return (
    <View style={internalStyles.container}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={
            appointmentData.clinicImage === ""
              ? require("../../../assets/images/no-image.png")
              : { uri: appointmentData.clinicImage }
          }
          style={internalStyles.clinicImage}
        />
        <TouchableOpacity
          onPress={handleViewClinic}
          style={internalStyles.clinicInfo}
        >
          <Text style={styles.clinicCardTitle}>
            {appointmentData.clinicName}
          </Text>
          <View style={internalStyles.ratingContainer}>
            <Rating
              rating={appointmentData.rating}
              reviews={appointmentData.reviews}
              size={17}
              star={5}
            />
            <Text style={styles.mainSubTitle}>
              <Text
                style={[
                  styles.paragraphText,
                  !appointmentData.address && styles.emptyResponseText,
                ]}
                numberOfLines={1}
              >
                {appointmentData.address
                  ? appointmentData.address
                  : "No address available"}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
        <View style={internalStyles.contentContainer}>
          <View style={styles.detailsRow}>
            <View style={{ width: "70%" }}>
              <Text style={styles.mainTitle}>Appointment Details:</Text>
            </View>
            <MainButton
              customStyle={[styles.detailsButton, { borderColor: statusColor }]}
              customeTextStyle={[
                styles.detailsButtonText,
                { color: statusColor },
              ]}
              buttonText={status}
              disabled
            />
          </View>
          <BookingContent data={appointmentData} />
        </View>
      </ScrollView>
      <View style={styles.mainButtonContainer}>
        <MainButton
          buttonText={buttonLabel}
          onPress={buttonAction}
          customStyle={status === "Upcoming" ? [styles.errorButton] : []}
        />
      </View>
      <Toast />
    </View>
  );
};

const internalStyles = {
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.BaseWhite,
  },
  clinicInfo: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    backgroundColor: colors.White,
    borderBottomColor: colors.Neutrals100,
  },
  clinicImage: {
    width: "100%",
    height: deviceHeight * 0.22,
    contentFit: "cover",
  },
  ratingContainer: {
    marginTop: 8,
    gap: 2,
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
};

export default AppointmentDetails;
