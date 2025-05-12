import React, { useState, useEffect, useRef } from "react";
import { View, Alert, Platform, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { styles } from "../../utils/styles";
import MainButton from "../../components/MainButton";
import { colors } from "../../utils/colors";
const customMarkerIcon = require("../../assets/images/marker.png");

const GOOGLE_API_KEY =
  Platform.OS === "ios"
    ? "AIzaSyD7X_czUJZX-WUv0ue5ashKj__wQfZPUG4"
    : "AIzaSyD-EOiAoMOL24Fel-XWxd3Rzi-i-qxioTs";

function HomeMapView({ navigation, route }) {
  const { address, latitude, longitude } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    longitude: null,
    latitude: null,
    address: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([
    {
      id: "1",
      latitude: 31.467014,
      longitude: 74.253032,
      title: "San Francisco City Center",
      description: "A bustling urban center.",
    },
    {
      id: "2",
      latitude: 31.470563,
      longitude: 74.256316,
      title: "Golden Gate Bridge",
      description: "A famous suspension bridge.",
    },
    {
      id: "3",
      latitude: 31.4675,
      longitude: 74.2539,
      title: "Local Cafe",
      description: "A popular spot for coffee and snacks.",
    },
    {
      id: "4",
      latitude: 31.470343,
      longitude: 74.252293,
      title: "Art Museum",
      description: "Features modern art and classic pieces.",
    },
  ]);
  const isAddressFetched = useRef(false);

  const handleSaveLocation = () => {
    if (!selectedLocation || !isAddressFetched.current || loading) {
      Alert.alert(
        "No Location Selected",
        "Please select a location and wait for the address to load before saving."
      );
      return;
    }

    navigation.navigate("MainScreen", {
      address: selectedLocation.address,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!latitude && !longitude) {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert(
              "Permission Denied",
              "Permission to access location was denied"
            );
            return;
          }

          const location = await Location.getCurrentPositionAsync({});

          const initialRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };

          setRegion(initialRegion);
          setSelectedLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          fetchAddress(location.coords.latitude, location.coords.longitude);
        } else {
          const initialRegion = {
            searchQuery: address,
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(initialRegion);
          setSelectedLocation({
            address: address,
            latitude: latitude,
            longitude: longitude,
          });
          fetchAddress(latitude, longitude);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to get current location.");
      }
    })();
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();

      if (
        data.results &&
        data.results.length > 0 &&
        data.results[0].formatted_address
      ) {
        setSelectedLocation({
          longitude,
          latitude,
          address: data.results[7].formatted_address,
        });
        isAddressFetched.current = true;
      } else {
        Alert.alert(
          "No Address Found",
          "Could not find an address for the selected location."
        );
      }
    } catch (error) {
      Alert.alert(
        "Geocoding Error",
        "Failed to get address for the selected location."
      );
    } finally {
      setLoading(false);
    }
  };

  const onMapPress = async (e) => {
    const coordinate = e.nativeEvent.coordinate;

    const newRegion = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
    fetchAddress(coordinate.latitude, coordinate.longitude);
  };
  return !loading ? (
    <View style={{ flex: 1, margin: 0 }}>
      <View style={styles.searchContainer}>
        <Icon name='search' size={20} color='#000' style={styles.searchIcon} />
        <GooglePlacesAutocomplete
          placeholder='Search for a location'
          placeholderTextColor={colors.Neutrals300}
          minLength={2}
          defaultValue={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const location = details.geometry.location;
              const newRegion = {
                address: data.description,
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(newRegion);
              setSelectedLocation({
                address: data.description,
                latitude: location.lat,
                longitude: location.lng,
              });
              if (mapRef.current) {
                mapRef.current.animateToRegion(newRegion, 1000);
              }
            }
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              flex: 1,
              zIndex: 2,
              overflow: "hidden",
            },
            textInput: {
              flex: 1,
              fontSize: 16,
              borderRadius: 8,
              paddingLeft: 40,
              // height: 40,
              // lineHeight: 16,
            },
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={200}
          enablePoweredByContainer={false}
          onFail={(error) => {
            Alert.alert(
              "Error",
              `Failed to fetch location suggestions: ${error.message}`
            );
          }}
        />
      </View>

      {region && (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={MapView.PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={region}
            onPress={onMapPress}
          >
            {/* {selectedLocation && <Marker coordinate={selectedLocation} />} */}
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
                image={customMarkerIcon}
              />
            ))}
          </MapView>
        </View>
      )}
      <View style={styles.mainButtonContainer}>
        <MainButton buttonText='Set Location' onPress={handleSaveLocation} />
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size='large' color='#7B35E3' />
    </View>
  );
}

export default HomeMapView;
