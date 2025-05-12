import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { loadFonts } from "./utils/font";
import { styles } from "./utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import Splash from "./screens/AuthScreens/WelcomeScreens/Splash";
import Onboardings from "./screens/AuthScreens/WelcomeScreens/Onboardings";
import Welcome from "./screens/AuthScreens/WelcomeScreens/Welcome";
import Signup from "./screens/AuthScreens/Signup";
import Login from "./screens/AuthScreens/Login";
import ForgetPasswordEmail from "./screens/AuthScreens/ForgetPasswordScreens/ForgetPasswordEmail";
import ForgetPasswordVerification from "./screens/AuthScreens/ForgetPasswordScreens/ForgetPasswordVerification";
import ForgetPasswordReset from "./screens/AuthScreens/ForgetPasswordScreens/ForgetPasswordReset";
import TabNavigator from "./navigation/TabNavigator";
import HeaderBackButton from "./components/HeaderBackButton";
import Notification from "./screens/NotificationScreens/Notification";
import Profile from "./screens/ProfileScreens/Profile";
import EditProfile from "./screens/ProfileScreens/EditProfile/EditProfile";
import ChangePassword from "./screens/ProfileScreens/ChangePassword/ChangePassword";
import DeleteAccount from "./screens/ProfileScreens/DeleteAccount/DeleteAccount";
import SocialAccounts from "./screens/ProfileScreens/SocialAccounts/SocialAccount";
import PrivacyPolices from "./screens/ProfileScreens/PrivacyPolices/PrivacyPolices";
import AppointmentDetails from "./screens/BookingScreens/AppointmentScreens/AppointmentDetails";
import CancellationReason from "./screens/BookingScreens/AppointmentScreens/CancellationReason";
import Feedback from "./screens/BookingScreens/ProvideFeedback/ProvideFeedback";
import ExploreMapView from "./screens/ExploreScreens/ExploreMapView";
import ClinicScreen from "./screens/ClinicsScreen/ClinicScreen";
import TeamScreen from "./screens/ClinicsScreen/TeamScreen/TeamScreen";
import Services from "./screens/HomeScreens/Services/Services";
import ServiceDetails from "./screens/HomeScreens/BookAppointment/ServiceDetails";
import BookAppointment from "./screens/HomeScreens/BookAppointment/BookAppointment";
import ConfirmAppointment from "./screens/HomeScreens/BookAppointment/ConfirmAppointment";
import ConfirmedAppointment from "./screens/HomeScreens/BookAppointment/ConfirmedAppointment";
import HomeMapView from "./screens/HomeScreens/HomeMapViewNew";
import CategoriesScreen from "./screens/HomeScreens/CategoriesSection/CategoriesScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await loadFonts();
        const token = await AsyncStorage.getItem("access_token");
        setIsLoggedIn(!!token);
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        setIsLoading(false);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (isLoading || !fontsLoaded) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "MainScreen" : "MainScreen"}
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerStyle: { backgroundColor: "#F2F2F2" },
          headerTitleStyle: styles.headerStyle,
          headerLeft: () => <HeaderBackButton style={styles.headerBackButon} />,
        }}
        lazy
      >
        <Stack.Screen
          name='Splash'
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Onboardings'
          component={Onboardings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Main App Screens */}
        <Stack.Screen
          name='MainScreen'
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ForgetPassword'
          component={ForgetPasswordEmail}
          options={{ headerTitle: "Forget Password" }}
        />
        <Stack.Screen
          name='ForgetPasswordVerification'
          component={ForgetPasswordVerification}
        />
        <Stack.Screen
          name='ForgetPasswordReset'
          component={ForgetPasswordReset}
        />
        <Stack.Screen
          name='HomeMapScreen'
          component={HomeMapView}
          options={{ headerTitle: "Location" }}
        />
        <Stack.Screen
          name='ServiceDetails'
          component={ServiceDetails}
          options={{ headerTitle: "Service Details" }}
        />
        <Stack.Screen
          name='ConfirmedAppointment'
          component={ConfirmedAppointment}
          options={{
            headerTitle: "Confirmed Appointment",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name='BookAppointment'
          component={BookAppointment}
          options={{ headerTitle: "Book Appointment" }}
        />
        <Stack.Screen
          name='ConfirmAppointment'
          component={ConfirmAppointment}
          options={{ headerTitle: "Confirm Appointment" }}
        />
        <Stack.Screen
          name='ClinicScreen'
          component={ClinicScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name='Services'
          component={Services}
          options={{ headerTitle: "Services" }}
        />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
          options={{ headerTitle: "Edit Profile" }}
        />
        <Stack.Screen
          name='ChangePassword'
          component={ChangePassword}
          options={{ headerTitle: "Change Password" }}
        />
        <Stack.Screen
          name='SocialAccount'
          component={SocialAccounts}
          options={{ headerTitle: "Social Accounts" }}
        />
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolices} />
        <Stack.Screen name='DeleteAccount' component={DeleteAccount} />
        <Stack.Screen
          name='MapScreen'
          component={ExploreMapView}
          options={{ headerTitle: "Location" }}
        />
        <Stack.Screen
          name='Notifications'
          component={Notification}
          options={{ headerTitle: "Notifications" }}
        />
        <Stack.Screen
          name='AppointmentDetails'
          component={AppointmentDetails}
          options={{ headerTitle: "My Appointment" }}
        />
        <Stack.Screen
          name='CancellationReason'
          component={CancellationReason}
          options={{ headerTitle: "Booking Cancelled" }}
        />
        <Stack.Screen
          name='Feedback'
          component={Feedback}
          options={{ headerTitle: "Provide Feedback" }}
        />

        <Stack.Screen
          name='CategoriesScreen'
          component={CategoriesScreen}
          options={{ headerTitle: "Select Category" }}
        />
        <Stack.Screen name='TeamScreen' component={TeamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
