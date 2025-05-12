import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import CategoryCard from "./CategoryCard";
import { TouchableOpacity } from "react-native";
import useGetCategories from "../../../helpers/Hooks/useGetCategories";
import { Skeleton } from "@rneui/themed";
import { styles } from "../../../utils/styles";
import { fonts } from "../../../utils/font";

import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../../utils/colors";
const CategoriesSlider = ({ navigation }) => {
  const { loading, categories } = useGetCategories();

  return (
    <View>
      <View style={internalStyles.containerHeading}>
        <Text style={styles.smallTitle}>Services Categories</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CategoriesScreen");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.smallTitle}>See All</Text>
            <Icon name='chevron-forward' size={11} />
          </View>
        </TouchableOpacity>
      </View>
      {!loading ? (
        <ScrollView
          contentContainerStyle={{ paddingLeft: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((service) => (
            <CategoryCard
              key={service.id}
              ServiceCardTitle={service.title}
              ServiceImage={service.image}
              customServiceCard={internalStyles.customServiceCard}
              customServiceTitle={internalStyles.customServiceTitle}
              onPress={() => {
                navigation.navigate("Services", {
                  title: service.title,
                  id: service.id,
                });
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={internalStyles.results}>
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              animation='wave'
              style={internalStyles.customServiceCard}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoriesSlider;
const internalStyles = StyleSheet.create({
  containerHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  customServiceCard: {
    height: 150,
    width: 120,
    marginRight: 10,
    borderRadius: 8,
  },
  customServiceTitle: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  results: {
    paddingLeft: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
