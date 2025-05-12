import React, { useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "../utils/styles";

const MainButton = ({ buttonText, onPress, customStyle, customeTextStyle,disabled }) => {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);

    await onPress();

    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={[styles.mainButton, customStyle]}
      onPress={handlePress}
      disabled={loading || disabled}
      activeOpacity={0.1}
    >
      {loading ? (
        <ActivityIndicator color='#fff' />
      ) : (
        <Text style={[styles.mainButtonText, customeTextStyle]}>
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;
