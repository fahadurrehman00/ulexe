import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { fonts } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import SubServiceCard from "./SubServiceCard";
import ChevronUpDown from "../../../assets/images/chevron-down.svg";
import { useRoute } from "@react-navigation/native";
import { styles } from "../../../utils/styles";

const ClinicServicesScreen = ({ navigation }) => {
  const route = useRoute();
  const { categories, basicInfo } = route.params;
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={internalStyles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={internalStyles.scrollContainer}
      >
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <View style={internalStyles.cardContainer} key={category.id}>
              <TouchableOpacity onPress={() => toggleExpand(category.id)}>
                <View style={internalStyles.collapsHeaderContainer}>
                  <Text style={styles.cardTitle}>{category.title}</Text>
                  <ChevronUpDown
                    style={
                      expandedId === category.id && internalStyles.revereIcon
                    }
                  />
                </View>
              </TouchableOpacity>
              {expandedId === category.id && (
                <View>
                  {category.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate("ServiceDetails", {
                          service: { ...option, ...basicInfo },
                        })
                      }
                    >
                      <SubServiceCard {...option} key={index} />
                      {/* Only add the border if it's not the last item */}
                      {index !== category.options.length - 1 && (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderColor: colors.Neutrals100,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={internalStyles.emptyContainer}>
            <Text style={styles.emptyResponseText}>
              No Services Available!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ClinicServicesScreen;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 8,
    flexGrow: 1,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.Secondary100,
    borderRadius: 8,
    backgroundColor: colors.White,
    shadowColor: colors.Neutrals100,
    elevation: 5,
    marginBottom: 12,
    padding: 16,
  },
  collapsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  revereIcon: {
    transform: [{ rotate: "180deg" }],
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  reviewNoReviewsText: {
    fontSize: 16,
    color: colors.Neutrals500,
    fontFamily: fonts.medium,
  },
});
