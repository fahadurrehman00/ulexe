import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts } from "../utils/font";
import { colors } from "../utils/colors";
import TabHeaderLogo from "../assets/images/TabHeaderLogo.svg";
import BellIcon from "../assets/images/bell.svg";
import Feather from "@expo/vector-icons/Feather";

const TabHeader = ({
  navigation,
  currentTab,
  location,
  loading,
  setSearch,
}) => {
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [hasUnread, setHasUnread] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onSearchTextChange = (text) => {
    setSearchValue(text);
  };
  const onSearchSubmit = () => {
    setSearch(searchValue);
  };

  const [checkAuth, setCheckAuth] = useState(false);
  const checkAuthStatus = async () => {
    token = await AsyncStorage.getItem("refresh_token");
    setCheckAuth(token);
  };

  useFocusEffect(
    useCallback(() => {
      checkAuthStatus();

      const loadProfileImage = async () => {
        try {
          const uri = await AsyncStorage.getItem("profileImage");
          if (uri) {
            setProfileImageUri(uri);
          }
        } catch (error) {
          console.error("Failed to load profile image:", error);
        }
      };
      loadProfileImage();
    }, [checkAuth])
  );

  const handleLocationPress = () => {
    if (location.latitude && location.longitude) {
      navigation.navigate("HomeMapScreen", {
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } else {
      Alert.alert(
        "Permission Required",
        "Location permission is required to access the map."
      );
    }
  };

  return (
    <View
      style={[
        internalStyles.container,
        currentTab === "Booking" && internalStyles.bookingContainer,
      ]}
    >
      <View style={internalStyles.headerTopRow}>
        <View style={internalStyles.leftSide}>
          <TabHeaderLogo height={60} />
          <TouchableOpacity
            style={internalStyles.locationContainer}
            onPress={handleLocationPress}
            disabled={loading}
          >
            <View style={internalStyles.findLocation}>
              <Feather style={internalStyles.pinIcon} name='map-pin' />
              <Text style={internalStyles.headerCityText}>
                {location.address && location.address.length > 25
                  ? `${location.address.substring(0, 25)}...`
                  : location.address || ""}
              </Text>
              <Feather name='chevron-right' style={internalStyles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={internalStyles.rightSide}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <BellIcon />
            {hasUnread && (
              <Animatable.View
                animation='bounceIn'
                iterationCount='infinite'
                duration={1500}
                style={internalStyles.notificationDot}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 99,
              borderColor: colors.Primary100,
            }}
            onPress={() =>
              checkAuth
                ? navigation.navigate("Profile")
                : navigation.navigate("Signup")
            }
          >
            <Image
              source={
                checkAuth
                  ? profileImageUri
                    ? { uri: profileImageUri }
                    : require("../assets/images/avatar.jpg")
                  : require("../assets/images/avatar.jpg")
              }
              style={internalStyles.profileIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {currentTab === "Home" && (
        <View style={internalStyles.headerSearchInput}>
          <Feather name='search' style={internalStyles.searchIcon} />
          <TextInput
            style={internalStyles.searchTextInput}
            placeholder='Search...'
            placeholderTextColor={colors.Neutrals300}
            value={searchValue}
            onChangeText={onSearchTextChange}
            onSubmitEditing={onSearchSubmit}
            returnKeyType='search'
          />
          {searchValue && (
            <TouchableOpacity
              onPress={() => {
                setSearch("");
                setSearchValue("");
              }}
            >
              <Feather name='x' style={internalStyles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const internalStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 42,
    paddingHorizontal: 10,
    paddingBottom: 6,
    backgroundColor: colors.White,
    shadowColor: colors.Neutrals400,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  bookingContainer: {
    shadowColor: colors.White,
  },
  headerTopRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightSide: {
    flexDirection: "row",
    // width: "30%",
    alignItems: "center",
    gap: 12,
  },
  notificationDot: {
    position: "absolute",
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: colors.BaseBlack,
  },
  profileIcon: {
    width: 46,
    height: 46,
    borderRadius: 99,
    contentFit: "contain",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    width: "76%",
  },
  locationContainer: {
    marginLeft: 6,
    justifyContent: "space-between",
  },
  locationTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: 6,
  },
  findLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pinIcon: {
    color: colors.Primary,
    fontSize: 18,
  },
  headerSearchInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 2,
    backgroundColor: colors.Secondary100,
    height: 39,
  },
  searchIcon: {
    fontSize: 20,
    color: colors.Neutrals400,
  },
  clearIcon: {
    fontSize: 12,
    color: colors.Neutrals400,
    padding: 2,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: colors.Neutrals400,
  },
  arrowIcon: {
    fontSize: 18,
  },
  searchTextInput: {
    flex: 1,
  },
  headerCityText: {
    fontFamily: fonts.regular,
  },
});

export default TabHeader;
