import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ResultCard from "../../components/ResultCard";
import { fonts } from "../../utils/font";
import MainButton from "../../components/MainButton";
import { colors } from "../../utils/colors";
import { styles } from "../../utils/styles";

const Results = ({ navigation, allServices, search }) => {
  const [displayServices, setDisplayServices] = useState([]);
  const [page, setPage] = useState(1);
  const servicesPerPage = 8;

  const phoneNumber = allServices.clinicPhone;
  useEffect(() => {
    setDisplayServices(allServices.slice(0, servicesPerPage));
  }, [allServices]);

  const loadMoreServices = () => {
    const nextPage = page + 1;
    const nextServices = allServices.slice(0, nextPage * servicesPerPage);
    setDisplayServices(nextServices);
    setPage(nextPage);
  };
  return (
    <View>
      <Text style={styles.smallTitle}>
        Results {""}
        {search && `for '${search}'`}
      </Text>
      {allServices.length > 0 ? (
        <View style={internalStyles.results}>
          {displayServices.map((result) => (
            <ResultCard
              key={result.id}
              serviceDetails={result}
              screenType='results'
              onPress={() =>
                navigation.navigate("ClinicScreen", {
                  id: result.clinicId,
                })
              }
            />
          ))}
          {allServices.length > displayServices.length && (
            <View style={{ width: "50%", margin: "auto" }}>
              <MainButton buttonText='Load More' onPress={loadMoreServices} />
            </View>
          )}
        </View>
      ) : (
        <View style={internalStyles.emptyContainer}>
          <Text style={styles.emptyResponseText}>No result found!</Text>
        </View>
      )}
    </View>
  );
};

export default Results;

const internalStyles = StyleSheet.create({
  results: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyContainer: {
    alignItems: "center",
  },
});
