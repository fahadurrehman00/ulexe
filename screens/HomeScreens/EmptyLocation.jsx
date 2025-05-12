import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  Linking,
  ActivityIndicator,
} from "react-native";
import LocationImage from "../../assets/images/location-pin.svg";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import { fonts } from "../../utils/font";
import MainButton from "../../components/MainButton";
import { Skeleton } from "@rneui/base";

const { width: screenWidth } = Dimensions.get("window");

const EmptyLocation = ({ onPermissionGranted }) => {
  const [isPermissionChecked, setIsPermissionChecked] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [buttonText, setButtonText] = useState("Allow Access");
  const [permissionInterval, setPermissionInterval] = useState(null);
  const [allowLocation, setAllowLocation] = useState(false);

  // Check initial permission when component is focused
  useFocusEffect(
    React.useCallback(() => {
      checkInitialPermission();

      // Clear any existing interval and start a new one
      if (permissionInterval) clearInterval(permissionInterval);
      const interval = setInterval(() => {
        checkInitialPermission();
      }, 1000);
      setPermissionInterval(interval);

      // Clear interval when component is blurred
      return () => clearInterval(interval);
    }, [])
  );

  const checkInitialPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted" || status === "always") {
      fetchLocation();
    } else {
      setButtonText("Allow Access");
      setShowComponent(true);
    }
    setIsPermissionChecked(true);
  };

  const fetchLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      let address = "Unknown Address";
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (reverseGeocode.length > 0) {
        const { name, street, city, region } = reverseGeocode[0];
        address = `${name || ""} ${street || ""}, ${city || ""}, ${
          region || ""
        }`;
      }
      onPermissionGranted({ latitude, longitude, address });
      setButtonText("Location Access Granted");
      setShowComponent(false);

      clearInterval(permissionInterval);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location. Please try again.");
    }
  };

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted" || status === "always") {
        fetchLocation();
      } else if (status === "denied" && allowLocation === true) {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();
        setAllowLocation(false);
        if (newStatus === "granted" || newStatus === "always") {
          fetchLocation();
        } else {
          Alert.alert("Permission Denied", "Location permission is required.");
        }
      } else if (status === "denied") {
        Alert.alert(
          "Location Permission Required",
          "Please allow location access in your settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Settings",
              onPress: () => {
                Linking.openSettings();
                setAllowLocation(true);
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to check location permission. Please try again."
      );
    }
  };

  if (!isPermissionChecked) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#7B35E3' />
      </View>
    );
  }

  return (
    showComponent && (
      <View style={internalStyles.emptyContainer}>
        <View style={internalStyles.imageContainer}>
          <LocationImage />
        </View>
        <Text style={internalStyles.title}>Allow Location Access!</Text>
        <Text style={internalStyles.description}>
          We need to access your location to provide you with precise results.
        </Text>
        <MainButton buttonText={buttonText} onPress={checkLocationPermission} />
      </View>
    )
  );
};

export default EmptyLocation;

const internalStyles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    margin: "auto",
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    marginBottom: 10,
    color: "#3D3D3D",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: fonts.regular,
    marginBottom: 20,
  },
  skeletonContainer: {
    flex: 1,
  },
});
