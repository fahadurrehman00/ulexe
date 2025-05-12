import React, { useState, useEffect, useRef } from "react";
import { View, Alert, Platform, Text, Image } from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { styles } from "../../utils/styles";
import { colors } from "../../utils/colors";
import { StyleSheet } from "react-native";
import { Appearance } from "react-native";
const customMarkerIcon = require("../../assets/images/marker.png");

const isDarkMode = Appearance.getColorScheme() === "dark";
const GOOGLE_API_KEY = Platform.select({
  ios: "AIzaSyD7X_czUJZX-WUv0ue5ashKj__wQfZPUG4",
  android: "AIzaSyD-EOiAoMOL24Fel-XWxd3Rzi-i-qxioTs",
});

function ExploreMapView({ clinic }) {
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Permission to access location was denied"
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const initialRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setInitialRegion(initialRegion);
        setSelectedLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          name: "Current Location",
          custom: false,
        });
        fetchAddress(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        Alert.alert("Error", "Failed to get current location.");
      }
    })();
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (
        data.results &&
        data.results.length > 0 &&
        data.results[0].formatted_address
      ) {
        setSelectedAddress(data.results[0].formatted_address);
      } else {
        setSelectedAddress("Unknown Address");
        Alert.alert(
          "No Address Found",
          "Could not find an address for the selected location."
        );
      }
    } catch (error) {
      setSelectedAddress("Unknown Address");
      Alert.alert(
        "Geocoding Error",
        "Failed to get address for the selected location."
      );
    }
  };

  const onMapPress = async (e) => {
    const coordinate = e.nativeEvent.coordinate;
    setSelectedLocation(coordinate);
    fetchAddress(coordinate.latitude, coordinate.longitude);
  };

  return (
    <View style={{ flex: 1, margin: 0 }}>
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Icon
            name='search'
            size={20}
            color='#000'
            style={styles.searchIcon}
          />
          <GooglePlacesAutocomplete
            placeholder='Search for a location'
            placeholderTextColor={colors.Primary}
            textInputProps={{ placeholderTextColor: "#888888" }}
            minLength={2}
            defaultValue={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details) {
                const location = details.geometry.location;
                const newRegion = {
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                };
                setInitialRegion(newRegion);
                setSelectedLocation({
                  latitude: location.lat,
                  longitude: location.lng,
                });
                fetchAddress(location.lat, location.lng);
                if (mapRef.current) {
                  mapRef.current.animateToRegion(newRegion, 1000);
                }
              }
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
            debounce={150}
            styles={{
              textInput: styles.textInput,
              placeholder: {
                color: "#000",
              },
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            enablePoweredByContainer={false}
          />
        </View>
      </View>

      {initialRegion && (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={Map.PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            showsCompass={false}
            onPress={onMapPress}
            showsUserLocation
            showsMyLocationButton
          >
            {clinic.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: parseFloat(marker.latitude),
                  longitude: parseFloat(marker.longitude),
                }}
                image={customMarkerIcon}
              >
                <Callout>
                  <View style={internalStyles.customPopup}>
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={require("../../assets/images/clinic.png")}
                    />
                    <Text style={internalStyles.popupTitle}>{marker.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
    </View>
  );
}

export default ExploreMapView;
const internalStyles = StyleSheet.create({
  placeholder: {
    color: isDarkMode ? colors.Primary : colors.Primary,
  },
});
