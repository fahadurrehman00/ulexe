import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Skeleton } from "@rneui/themed";
import CategoryCard from "./CategoryCard";
import useGetCategories from "../../../helpers/Hooks/useGetCategories";

const CategoriesScreen = ({ navigation }) => {
  const { loading, categories } = useGetCategories();

  return (
    <View style={{ flex: 1 }}>
      {!loading && categories.length !== 0 ? (
        <ScrollView contentContainerStyle={internalStyles.container}>
          <View style={internalStyles.cardsWrapper}>
            {categories.map((service) => (
              <CategoryCard
                key={service.id}
                ServiceCardTitle={service.title}
                ServiceImage={service.image}
                customServiceCard={internalStyles.customServiceCard}
                onPress={() => {
                  navigation.navigate("Services", {
                    title: service.title,
                    id: service.id,
                  });
                }}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={internalStyles.container}>
          <View style={internalStyles.cardsWrapper}>
            {[...Array(8)].map((_, index) => (
              <Skeleton
                key={index}
                animation='wave'
                width={110}
                height={160}
                backgroundColor={"#CACACA"}
                borderRadius={10}
                style={internalStyles.customServiceCard}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default CategoriesScreen;

const internalStyles = StyleSheet.create({
  container: {
    padding: 12,
  },
  cardsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  customServiceCard: {
    width: "48.5%",
    height: 160,
    marginBottom: 12,
  },
});
