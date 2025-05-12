import { StyleSheet, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";
import { colors } from "../../utils/colors";

const ExploreSkeleton = () => {
  return (
    <View style={internalStyles.loadingContainer}>
      {[...Array(3)].map((_, index) => (
        <View
          key={index}
          style={{
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Skeleton
            animation='wave'
            width='100%'
            height={100}
            borderRadius={8}
          />
        </View>
      ))}
    </View>
  );
};

export default ExploreSkeleton;

const internalStyles = StyleSheet.create({
  loadingContainer: {
    height: "30%",
    borderRadius: 50,
    padding: 8,
  },
});
