import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/font";
import { styles } from "../../../utils/styles";

const HoursScreen = ({ route }) => {
  const { hours } = route.params;
  return (
    <View style={internalStyles.container}>
      <ScrollView contentContainerStyle={internalStyles.scrollContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.mainSubTitle}>
            Our services are available from the following hours and days.
          </Text>
        </View>
        {hours.map((item, index) => (
          <View key={index} style={internalStyles.hoursEditRow}>
            <View style={internalStyles.hoursEditDayContainer}>
              <View
                style={[
                  internalStyles.hoursEditCircle,
                  item.isClosed && internalStyles.hoursEditClosedCircle,
                ]}
              />
              <Text
                style={[
                  styles.mainSubTitle,
                  item.active && { color: colors.Primary },
                ]}
              >
                {item.day}
              </Text>
            </View>
            <Text
              style={[
                styles.mainSubTitle,
                item.isClosed
                  ? internalStyles.hoursEditClosedText
                  : item.active
                  ? { color: colors.Primary }
                  : "",
              ]}
            >
              {item.isClosed ? "Closed" : item.time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BaseWhite,
  },
  scrollContainer: {
    padding: 8,
  },
  hoursEditHeaderText: {
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  hoursEditSubHeaderText: {
    fontSize: 12,
    marginBottom: 16,
    fontFamily: fonts.medium,
    color: colors.Neutrals600,
  },
  hoursEditRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  hoursEditDayContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hoursEditCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.Success200,
    marginRight: 8,
  },
  hoursEditClosedCircle: {
    backgroundColor: colors.Neutrals200,
  },
  hoursEditClosedText: {
    color: colors.Neutrals400,
    fontFamily: fonts.semiBold,
  },
});

export default HoursScreen;
