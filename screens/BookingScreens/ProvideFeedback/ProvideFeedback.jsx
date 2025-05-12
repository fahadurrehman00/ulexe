import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { styles } from "../../../utils/styles";
import PopupVerification from "../../../components/PopupVerification";
import { colors } from "../../../utils/colors";
import MainButton from "../../../components/MainButton";
import { fonts } from "../../../utils/font";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import { apiCall } from "../../../utils/api";
import SeeClinicCard from "../../../components/SeeClinicCard";

const FeedbackForm = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ratings, setRatings] = useState();
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { appointmentData, price } = route.params || {};

  const handleFeedbackSubmit = async () => {
    const payload = {
      clinic_id: appointmentData.clinicId,
      booking_id: appointmentData.bookingId,
      rating: ratings,
      comment: review,
    };
    setIsLoading(true);
    try {
      const response = await apiCall(
        `/ratings`,
        "POST",
        payload,
        true,
        {},
        "token"
      );

      if (response.status === "Error") {
        showToast("error", "Error", response.msg);
      } else {
        showToast(
          "success",
          "Feedback Submit",
          "Your feedback have been submitted successfully"
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Booking Error",
        "Failed to confirm the booking. Please try again."
      );
    }
    Keyboard.dismiss();
    setTimeout(() => {
      setIsLoading(false);
      setModalVisible(true);
    }, 0);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleGoHome = () => {
    navigation.navigate("Booking");
    setModalVisible(false);
  };

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 1000,
      autoHide: true,
      topOffset: 10,
    });
  };

  const handleShow = async () => {
    navigation.navigate("AppointmentDetails", {
      booking: appointmentData,
    });
    setModalVisible(false);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRatings(i)}>
          <AntDesign
            name={i <= ratings ? "star" : "staro"}
            size={20}
            color={colors.Primary}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={internalStyles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps='handled'
      >
        <View>
          <SeeClinicCard clinic={appointmentData} />
          <Text style={styles.mainTitle}>How was your appointment?</Text>
          <Text style={styles.mainSubTitle}>
            Please provide feedback about your appointment. Your input will help
            other customers see reviews and make informed decisions.
          </Text>
          <View style={internalStyles.horizontalDivider} />

          <Text style={styles.lightTitle}>
            How would you rate your experience?
          </Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            {renderStars()}
          </View>
          <Text style={styles.lightTitle}>
            Would you tell us a little more about your experience?
          </Text>
          <TextInput
            style={internalStyles.reviewInput}
            placeholder='Please write a short review...'
            placeholderTextColor={colors.Neutrals200}
            multiline
            value={review}
            onChangeText={setReview}
          />
        </View>
      </ScrollView>
      <View style={styles.mainButtonContainer}>
        <View
          style={[
            styles.buttonContainer,
            { paddingBottom: keyboardVisible ? 90 : 0 },
          ]}
        >
          <MainButton
            disabled={!ratings || review === ""}
            buttonText='Provide Feedback'
            onPress={handleFeedbackSubmit}
            customStyle={[
              !ratings || review === "" ? styles.disableButton : null,
            ]}
          />
        </View>
      </View>
      {isModalVisible && (
        <PopupVerification
          heading='Review Posted'
          message="Thank you for your valuable feedback. Your review has been posted on the clinic's profile."
          cancelText='Go to home'
          confirmText='See Review'
          onCancel={handleGoHome}
          onConfirm={handleShow}
          isLoading={isLoading}
          style={styles.cancellationButton}
        />
      )}
      <Toast />
    </KeyboardAvoidingView>
  );
};

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reviewInput: {
    marginTop: 10,
    padding: 10,
    height: 100,
    borderColor: colors.Neutrals200,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.White,
    textAlignVertical: "top",
    fontFamily: fonts.regular,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: colors.Neutrals100,
    marginVertical: 8,
  },
});

export default FeedbackForm;
