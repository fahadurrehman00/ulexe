import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
const BookingTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <View style={internalStyles.bookingsTabsContainer}>
      {["Upcoming", "Completed", "Cancelled"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setSelectedTab(tab)}
          style={[
            internalStyles.bookingTab,
            selectedTab === tab && internalStyles.selectedBookingTab,
          ]}
        >
          <Text
            style={[
              internalStyles.bookingTabText,
              selectedTab === tab && internalStyles.selectedBookingTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BookingTabs;
const internalStyles = StyleSheet.create({
  bookingsTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.White,
  },
  bookingTab: {
    borderBottomWidth: 1.4,
    marginBottom: 2,
    borderBottomColor: colors.White,
  },
  selectedBookingTab: {
    borderBottomColor: colors.BaseBlack,
  },
  bookingTabText: {
    fontSize: 16,
    paddingBottom: 4,
    fontFamily: fonts.regular,
    color: colors.Neutrals400,
  },
  selectedBookingTabText: {
    color: colors.BaseBlack,
  },
});
