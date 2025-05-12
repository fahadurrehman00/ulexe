import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";
const HomeSkeleton = () => {
  return (
    <View>
      <Skeleton
        key={index}
        animation='wave'
        width='100%'
        height={180}
        borderRadius={10}
        style={internalStyles.customServiceCard}
      />
      <Skeleton
        key={index}
        animation='wave'
        width='100%'
        height={220}
        borderRadius={10}
        style={internalStyles.customServiceCard}
      />
      <View style={internalStyles.labels}>
        <Skeleton
          key={index}
          animation='wave'
          width={40}
          height={20}
          borderRadius={10}
          style={internalStyles.customServiceCard}
        />
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            animation='wave'
            width={40}
            height={80}
            borderRadius={10}
            style={internalStyles.customServiceCard}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeSkeleton;

const internalStyles = StyleSheet.create({
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
