import React, { forwardRef } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../utils/styles";
import { colors } from "../utils/colors";

const InputField = forwardRef(
  (
    {
      inputLabel,
      value,
      placeholder,
      onChangeText,
      keyboardType = "default",
      validate,
      rightIcon,
      customStyle,
      editable,
      containerCustomStyle,
      error = false,
      errorMessage = "Required field",
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
      <View style={[styles.inputContainerErrorWrapper]}>
        {inputLabel && <Text style={styles.inputLabel}>{inputLabel}</Text>}
        <View
          style={[
            styles.inputContainer,
            containerCustomStyle,
            error && styles.ValidationErrorInput,
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.inputText, customStyle]}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={colors.Neutrals300}
            onChangeText={handleChange}
            keyboardType={keyboardType}
            editable={editable}
          />
          {rightIcon}
        </View>
        {<Text style={styles.errorText}>{error ? errorMessage : ""}</Text>}
      </View>
    );
  }
);

export default InputField;
