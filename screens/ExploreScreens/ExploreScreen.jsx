import { View, StyleSheet, Text } from "react-native";
import ExploreMapView from "./ExploreMapView.jsx";
import SlidingUpContainer from "./SlidingUpContainer.jsx";
import useGetMapClinics from "../../helpers/Hooks/useGetMapClinics.js";
import ExploreSkeleton from "../../components/Skeletons/ExploreSkeleton.jsx";

const ExploreScreen = () => {
  const { loading, clinic } = useGetMapClinics({
    lat: 14,
    lng: 56,
    searchKeyword: "Paris",
  });

  return (
    <View style={styles.container}>
      <ExploreMapView clinic={clinic} />
      {loading ? (
        <ExploreSkeleton />
      ) : clinic.length > 0 ? (
        <SlidingUpContainer noOfCards={clinic.length} clinicsData={clinic} />
      ) : (
        <Text>No clinics found</Text>
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skeletonContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
