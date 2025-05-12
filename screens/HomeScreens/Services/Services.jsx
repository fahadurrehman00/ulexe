import { ScrollView, View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import ResultCard from "../../../components/ResultCard";
import useGetServices from "../../../helpers/Hooks/useGetServices";
import { Skeleton } from "@rneui/themed";
import { fonts } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { styles } from "../../../utils/styles";

const Services = ({ navigation, route }) => {
  const { title, id } = route.params;

  const { loading, services } = useGetServices({ id });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [id, title]);

  return (
    <>
      {loading ? (
        <View style={internalStyles.container}>
          <View style={internalStyles.results}>
            {[...Array(8)].map((_, index) => (
              <Skeleton
                key={index}
                animation='wave'
                style={internalStyles.skeletonCard}
              />
            ))}
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={internalStyles.container}>
          <View style={internalStyles.results}>
            {services.length > 0 ? (
              services.map((result) => (
                <ResultCard
                  key={result.id}
                  serviceDetails={result}
                  screenType='service'
                  onPress={() =>
                    navigation.navigate("ServiceDetails", {
                      service: result,
                    })
                  }
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyResponseText}>No services found!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Services;

const internalStyles = StyleSheet.create({
  container: {
    padding: 8,
  },
  results: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skeletonCard: {
    width: "48%",
    height: 160,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#CACACA",
  },
});
