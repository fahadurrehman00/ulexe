import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "../utils/styles";

const PopupVerification = ({
  heading,
  message,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  style,
  isLoading,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.popupContainer}>
        <Text style={styles.popupHeading}>{heading}</Text>
        <Text style={styles.popupParagraph}>{message}</Text>
        <View style={styles.popupButtonContainer}>
          <TouchableOpacity
            style={[styles.popupButton, styles.popupCancelButton]}
            onPress={onCancel}
            disabled={isLoading}
          >
            <Text style={styles.popupCancelButtonText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.popupButton, styles.popupConfirmButton, style]}
            onPress={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ActivityIndicator size='small' color='#fff' />
              </View>
            ) : (
              <Text style={styles.popupButtonText}>{confirmText}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PopupVerification;
