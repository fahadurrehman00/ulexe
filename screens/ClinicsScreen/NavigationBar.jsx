import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, StyleSheet } from "react-native";
import ReviewsScreen from "./ReviewScreen/ReviewScreen";
import HoursScreen from "./HoursScreen/HoursScreen";
import TeamScreen from "./TeamScreen/TeamScreen";
import AboutScreen from "./AboutScreen/AboutScreen";
import ServicesScreen from "./ServicesScreen/ServicesScreen";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/font";

const Tab = createMaterialTopTabNavigator();

const NavigationBar = ({ clinicDetails }) => {
  const { basicInfo, categories, reviews, hours, team, about } =
    clinicDetails.clinic;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let label;
          switch (route.name) {
            case "Reviews":
              label = "Reviews";
              break;
            case "Services":
              label = "Services";
              break;
            case "Hours":
              label = "Hours";
              break;
            case "Team":
              label = "Team";
              break;
            case "About":
              label = "About";
              break;
          }
          return (
            <View style={internalStyles.clinicTabContainer}>
              <Text
                style={[
                  focused
                    ? internalStyles.clinicTabLabel
                    : internalStyles.clinicInactiveLabel,
                  internalStyles.clinicTabLabel,
                ]}
              >
                {label}
              </Text>
            </View>
          );
        },
        tabBarStyle: internalStyles.clinicTabBarStyle,
        tabBarIndicatorStyle: internalStyles.clinicTabBarIndicator,
        tabBarPressColor: colors.White,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      })}
    >
      <Tab.Screen
        name='Services'
        component={ServicesScreen}
        initialParams={{ categories, basicInfo }}
      />
      <Tab.Screen
        name='Reviews'
        component={ReviewsScreen}
        initialParams={{ reviews }}
      />
      <Tab.Screen
        name='Hours'
        component={HoursScreen}
        initialParams={{ hours }}
      />
      <Tab.Screen name='Team' component={TeamScreen} initialParams={{ team }} />
      <Tab.Screen
        name='About'
        component={AboutScreen}
        initialParams={{ about }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBar;

const internalStyles = StyleSheet.create({
  clinicTabBarStyle: {
    backgroundColor: colors.White,
  },
  clinicTabContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  clinicTabLabel: {
    fontSize: 13,
    fontFamily: fonts.medium,
  },
  clinicInactiveLabel: {
    fontSize: 13,
    color: colors.Neutrals600,
  },
  clinicTabBarIndicator: {
    backgroundColor: colors.BaseBlack,
  },
});
