import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { styles } from "../../../utils/styles";
import MainButton from "../../../components/MainButton";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiCall } from "../../../utils/api";
import CancelAPoint from "../../../assets/images/Cancel-apoint-1.png";
import { colors } from "../../../utils/colors";
import PopupVerification from "../../../components/PopupVerification";

const CancellationReason = () => {
  const route = useRoute();
  const { bookingId } = route.params || {};
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");
  const [popup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 10,
    });
  };

  const handleCancelAppointment = () => {
    if (!selected) {
      showToast(
        "error",
        "Validation Error",
        "Please select a reason for cancellation."
      );
      return;
    }
    Keyboard.dismiss();
    setPopup(true);
  };

  const confirmCancellation = async () => {
    setIsLoading(true);
    const payLoad = {
      status: "cancelled",
      cancel_reason: selected,
      cancel_comment: description,
    };
    try {
      const response = await apiCall(
        `/bookings/${bookingId}`,
        "PUT",
        payLoad,
        true,
        {},
        "token"
      );

      if (response.status !== "Error") {
        showToast("success", "Success", "Booking cancelled successfully.");
        setTimeout(() => {
          navigation.navigate("Booking");
        }, 500);
      } else {
        showToast("error", "Error", "Failed to cancel booking.");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        showToast(
          "error",
          "Network Error",
          "Please check your internet connection and try again."
        );
      } else {
        showToast("error", "Booking Error", "Failed to cancel booking.");
      }
    } finally {
      setPopup(false);
      setIsLoading(false);
    }
  };

  const reasons = [
    {
      key: "1",
      value:
        "1. Decided to opt for an alternative form of treatment such as telemedicine or home remedies.",
    },
    {
      key: "2",
      value: "2. Have another commitment at the same time as the appointment.",
    },
    {
      key: "3",
      value:
        "3. Difficulty in getting to the clinic due to lack of transport, high travel costs, or other logistics.",
    },
    { key: "4", value: "4. Concern about waiting times at the clinic." },
    {
      key: "5",
      value:
        "5. No longer feeling the symptoms or the issue seems resolved without medical intervention.",
    },
  ];

  const isButtonDisabled = !selected;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.cancellationReasonContainer}>
          <View>
            <View style={internalStyles.headerContent}>
              <Image
                source={CancelAPoint}
                style={internalStyles.cancelImage}
                resizeMode='contain'
                accessibilityLabel='Cancel Appointment Image'
                accessible={true}
              />
              <Text style={[styles.mainTitle, internalStyles.textCenter]}>
                Cancel Appointment?
              </Text>
              <Text style={[styles.mainSubTitle, internalStyles.textCenter]}>
                Could you please let us know why you canceled this booking? Your
                feedback will help us provide a better experience next time.
              </Text>
            </View>

            <SelectList
              boxStyles={styles.cancellationReasonSelectList}
              dropdownStyles={styles.cancellationReasonSelectListDropdown}
              setSelected={setSelected}
              data={reasons}
              save='key'
              placeholder='Select Reason'
              placeholderStyles={styles.placeholderStyles}
              accessibilityLabel='Cancellation Reason Dropdown'
              accessibilityHint='Select a reason for canceling your appointment'
            />
            <TextInput
              style={styles.cancellationReasonTextArea}
              multiline={true}
              placeholderTextColor={colors.Neutrals300}
              numberOfLines={5}
              maxLength={400}
              value={description}
              onChangeText={setDescription}
              placeholder='Please write a short reason for cancellation... (Optional)'
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.mainButtonContainer}>
        <MainButton
          buttonText='Cancel Appointment'
          onPress={handleCancelAppointment}
          customStyle={[
            styles.errorButton,
            isButtonDisabled && styles.disableCancelButton,
          ]}
          disabled={isButtonDisabled}
          accessibilityLabel='Confirm Cancellation'
          accessibilityHint='Press to confirm the cancellation of your appointment'
        />
      </View>

      {popup && (
        <PopupVerification
          heading='Cancel Appointment?'
          message='Are you sure you want to cancel this appointment?'
          cancelText='Cancel'
          confirmText='Yes, Cancel'
          onCancel={() => setPopup(false)}
          onConfirm={confirmCancellation}
          isLoading={isLoading}
        />
      )}

      <Toast />
    </KeyboardAvoidingView>
  );
};
export default CancellationReason;

const internalStyles = StyleSheet.create({
  headerContent: {
    alignItems: "center",
    marginBottom: 24,
  },
  textCenter: {
    textAlign: "center",
  },
  cancelImage: {
    width: 250,
    height: 200,
  },
});
