import { StyleSheet, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

const BookingsSkeleton = () => {
  return (
    <View style={internalStyles.loadingContainer}>
      <Skeleton
        animation='wave'
        width='70%'
        height={12}
        borderRadius={8}
        marginVertical={16}
      />
      <View>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={{ alignItems: "center", marginBottom: 10 }}>
            <Skeleton
              animation='wave'
              width='100%'
              height={200}
              borderRadius={8}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default BookingsSkeleton;

const internalStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    padding: 8,
  },
});
