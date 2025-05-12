import React, { forwardRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { styles } from "../utils/styles";
import { colors } from "../utils/colors";

const PasswordField = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      secureTextEntry,
      togglePasswordVisibility,
      placeholder,
      error = false,
      errorMessage = "Required field",
      customStyle,
      validate,
    },
    ref
  ) => {
    const handleChange = (text) => {
      onChangeText(text);
      if (validate) {
        validate(text);
      }
    };

    return (
      <View
        style={[
          styles.inputContainerErrorWrapper,
          styles.passwordFieldContainer,
        ]}
      >
        {label && <Text style={styles.inputLabel}>{label}</Text>}
        <View
          style={[styles.inputContainer, error && styles.ValidationErrorInput]}
        >
          <TextInput
            ref={ref}
            style={[styles.passwordInput, customStyle]}
            placeholder={placeholder}
            placeholderTextColor={colors.Neutrals300}
            value={value}
            onChangeText={handleChange}
            secureTextEntry={!secureTextEntry}
          />
          {togglePasswordVisibility && (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Octicons
                name={secureTextEntry ? "eye" : "eye-closed"}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {<Text style={styles.errorText}>{error ? errorMessage : ""}</Text>}
      </View>
    );
  }
);

export default PasswordField;
