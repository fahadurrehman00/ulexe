import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { styles } from "../../utils/styles";
import MainButton from "../../components/MainButton";
import { Image } from "expo-image";
import { fonts } from "../../utils/font";
const customMarkerIcon = require("../../assets/images/marker.png");

const GOOGLE_API_KEY = Platform.select({
  ios: "AIzaSyD7X_czUJZX-WUv0ue5ashKj__wQfZPUG4",
  android: "AIzaSyD-EOiAoMOL24Fel-XWxd3Rzi-i-qxioTs",
});

function HomeMapView({ navigation, route }) {
  const { address, latitude, longitude } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [markers, setMarkers] = useState([
    {
      latitude: 31.467014,
      longitude: 74.253032,
      name: "Fahad Clinic",
      image: require("../../assets/images/clinic.png"),
    },
    {
      latitude: 31.470563,
      longitude: 74.256316,
      name: "Fahad Clinic",
      image: require("../../assets/images/clinic.png"),
    },
  ]);

  const mapRef = useRef(null);

  useEffect(() => {
    // Immediate fallback to default location while fetching user's actual location.
    (async () => {
      try {
        setLoading(false);
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          const { status: newStatus } =
            await Location.requestForegroundPermissionsAsync();
          if (newStatus !== "granted") {
            Alert.alert("Permission Denied", "Location permission was denied");
            setLoading(false);
            return;
          }
        }

        let coords;
        if (!latitude || !longitude) {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
          });
          coords = location.coords;
        } else {
          coords = { latitude, longitude };
        }

        // Set initial region immediately
        setRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        fetchAddress(coords.latitude, coords.longitude);
        setSelectedLocation((prev) => ({
          ...prev,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }));
      } catch {
        Alert.alert("Error", "Failed to get current location.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      const fetchedAddress =
        data.results?.[0]?.formatted_address || "Address not found";

      setSelectedLocation((prev) => ({
        ...prev,
        address: fetchedAddress,
        latitude: lat,
        longitude: lng,
      }));
    } catch {
      Alert.alert("Error", "Failed to get address for the selected location.");
    }
  };

  const moveToUserLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const coords = location.coords;

      const newRegion = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);
      fetchAddress(coords.latitude, coords.longitude);
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch {
      Alert.alert("Error", "Unable to get your current location.");
    }
  };

  const onMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setRegion((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
    fetchAddress(latitude, longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size='large' color='#7B35E3' />
        </View>
      ) : (
        <>
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
                textInputProps={{ placeholderTextColor: "#888888" }}
                minLength={2}
                fetchDetails
                debounce={300}
                query={{
                  key: GOOGLE_API_KEY,
                  language: "en",
                  radius: 10000,
                }}
                onPress={(data, details) => {
                  if (details) {
                    const { lat, lng } = details.geometry.location;
                    const newRegion = {
                      latitude: lat,
                      longitude: lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    };
                    setRegion(newRegion);
                    setSelectedLocation({
                      address: data.description,
                      latitude: lat,
                      longitude: lng,
                    });
                    mapRef.current?.animateToRegion(newRegion, 1000);
                  }
                }}
                styles={{
                  textInput: styles.textInput,
                }}
                enablePoweredByContainer={false}
                onFail={(error) =>
                  Alert.alert(
                    "Error",
                    `Failed to fetch locations: ${error.message}`
                  )
                }
              />
            </View>
          </View>

          <MapView
            ref={mapRef}
            provider={MapView.PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={region}
            onPress={onMapPress}
            showsUserLocation
          >
            {markers.map((marker, index) => (
              <Marker key={index} coordinate={marker} image={customMarkerIcon}>
                <Callout>
                  {/* <View style={{ padding: 10, flexDirection: "row" }}>
                    <View
                      style={{
                        borderRadius: 39,
                        height: 25,
                        width: 25,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{ height: 25, width: 25 }}
                        source={require("../../assets/images/clinic.png")}
                      />
                    </View>
                    <Text style={{ fontFamily: fonts.bold }}>
                      {marker.name}
                    </Text>
                  </View> */}
                </Callout>
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 100,
              right: 20,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 50,
              elevation: 5,
            }}
            onPress={moveToUserLocation}
          >
            <Icon name='my-location' size={25} color='#7B35E3' />
          </TouchableOpacity>
          <View style={styles.mainButtonContainer}>
            <MainButton
              buttonText='Set Location'
              onPress={() =>
                navigation.navigate("MainScreen", selectedLocation)
              }
            />
          </View>
        </>
      )}
    </View>
  );
}

export default HomeMapView;
const internalStyles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: "#f39c12",
  },
});
