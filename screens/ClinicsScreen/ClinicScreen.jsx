import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ClinicHeader from "./ClinicHeader.jsx";
import useGetClinic from "../../helpers/Hooks/useGetClinic.js";
import ClinicSkeleton from "../../components/Skeletons/ClinicSkeleton.jsx";
import NavigationBar from "./NavigationBar.jsx";

const ClinicScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { clinic } = useGetClinic({ id });

  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        Object.keys(clinic).length > 0 ? clinic?.basicInfo?.clinicName : "",
    });
  }, [clinic]);

  return Object.keys(clinic).length > 0 ? (
    <View style={internalStyles.container}>
      <ClinicHeader clinicDetails={clinic.basicInfo} />
      <NavigationBar clinicDetails={{ clinic, id }} />
    </View>
  ) : (
    <ClinicSkeleton />
  );
};

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ClinicScreen;
