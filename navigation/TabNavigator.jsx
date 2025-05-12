import React, { useCallback, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet, View, Dimensions, Alert } from "react-native";
import * as Location from "expo-location";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import BookingsScreen from "../screens/BookingScreens/BookingsScreen";
import TabHeader from "../components/TabHeader";
import HomeScreen from "../screens/HomeScreens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreens/ExploreScreen";
import EmptyLocation from "../screens/HomeScreens/EmptyLocation";
import HomeIcon from "../assets/images/Home.svg";
import FocusedHomeIcon from "../assets/images/Focused-Home.svg";
import ExploreIcon from "../assets/images/Explore.svg";
import FocusedExploreIcon from "../assets/images/Focused-Explore.svg";
import BookingIcon from "../assets/images/Booking.svg";
import FocusedBookingIcon from "../assets/images/Focused-Booking.svg";
import { Skeleton } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const GOOGLE_API_KEY = Platform.select({
  ios: "AIzaSyD7X_czUJZX-WUv0ue5ashKj__wQfZPUG4",
  android: "AIzaSyD-EOiAoMOL24Fel-XWxd3Rzi-i-qxioTs",
});

const Tab = createBottomTabNavigator();
const { width: screenWidth } = Dimensions.get("window");

const TabNavigator = ({ route }) => {
  const navigation = useNavigation();
  const [checkAuth, setCheckAuth] = useState(false);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem("refresh_token");
    setCheckAuth(!!token);
  };

  useFocusEffect(
    useCallback(() => {
      checkAuthStatus();
    }, [checkAuth])
  );

  const {
    address: initialAddress,
    longitude: initialLongitude,
    latitude: initialLatitude,
  } = route.params || {};

  const [location, setLocation] = useState({
    address: initialAddress || "No Address Available",
    latitude: initialLatitude || null,
    longitude: initialLongitude || null,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (route.params) {
      setLocation({
        address: route.params.address || "No Address Available",
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
    }
  }, [route.params]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return "Address not found";
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get address for the selected location.");
      return "Address not found";
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionGranted(false);
        setLoading(false);
        return;
      }
      setPermissionGranted(true);
      const { coords } = await Location.getCurrentPositionAsync({});
      const currentAddress = await fetchAddress(
        coords.latitude,
        coords.longitude
      );

      setLocation({
        address: currentAddress,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to get current location.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location.latitude || !location.longitude) {
      getCurrentLocation();
    } else {
      setLoading(false);
    }
  }, [location.latitude, location.longitude]);

  const handleLocationUpdate = (newLocation) => {
    setLocation({
      address: newLocation.address || "No Address Available",
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
    });
  };

  const renderHome = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Skeleton
            animation='wave'
            width={screenWidth * 0.93}
            height={200}
            marginBottom={20}
            borderRadius={10}
          />
        </View>
      );
    }

    return location.latitude && location.longitude ? (
      <HomeScreen
        search={search}
        setSearch={setSearch}
        address={location.address}
        longitude={location.longitude}
        latitude={location.latitude}
      />
    ) : (
      !permissionGranted && (
        <EmptyLocation onPermissionGranted={getCurrentLocation} />
      )
    );
  };

  // Custom navigation logic for the Booking tab
  const handleBookingPress = () => {
    if (checkAuth) {
      navigation.navigate("Booking");
    } else {
      navigation.navigate("Signup");
    }
  };

  const getTabBarIcon = (routeName, focused, size) => {
    let IconComponent;
    switch (routeName) {
      case "Home":
        IconComponent = focused ? FocusedHomeIcon : HomeIcon;
        break;
      case "Explore":
        IconComponent = focused ? FocusedExploreIcon : ExploreIcon;
        break;
      case "Booking":
        IconComponent = focused ? FocusedBookingIcon : BookingIcon;
        break;
      default:
        IconComponent = HomeIcon;
        break;
    }
    return <IconComponent width={size} height={size} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) =>
          getTabBarIcon(route.name, focused, size),
        tabBarActiveTintColor: colors.Primary,
        tabBarInactiveTintColor: colors.Neutrals700,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      })}
    >
      <Tab.Screen
        name='Home'
        children={renderHome}
        options={({ navigation }) => ({
          header: () => (
            <TabHeader
              navigation={navigation}
              currentTab='Home'
              location={location}
              loading={loading}
              search={search}
              setSearch={setSearch}
              onLocationSelect={handleLocationUpdate}
            />
          ),
        })}
      />
      <Tab.Screen
        name='Explore'
        component={ExploreScreen}
        options={({ navigation }) => ({
          header: () => (
            <TabHeader
              navigation={navigation}
              currentTab='Explore'
              location={location}
              loading={loading}
              onLocationSelect={handleLocationUpdate}
            />
          ),
        })}
      />
      <Tab.Screen
        name='Booking'
        component={BookingsScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent the default tab press behavior
            handleBookingPress(); // Custom behavior on booking tab press
          },
        }}
        options={({ navigation }) => ({
          header: () => (
            <TabHeader
              navigation={navigation}
              currentTab='Booking'
              location={location}
              loading={loading}
              onLocationSelect={handleLocationUpdate}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
  },
  tabBarStyle: {
    backgroundColor: colors.BaseWhite,
    height: 74,
    paddingBottom: 26,
    paddingTop: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
