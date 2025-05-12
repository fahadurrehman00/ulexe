import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

const { height: deviceHeight } = Dimensions.get("window");
const AppDetailsSkeleton = () => {
  return (
    <View>
      <Skeleton
        animation='wave'
        width='100%'
        height={200}
        marginBottom={10}
        style={internalStyles.clinicImage}
      />
      <View style={{ padding: 8 }}>
        <Skeleton
          animation='wave'
          width={120}
          height={12}
          borderRadius={49}
          marginBottom={20}
        />
        <Skeleton
          animation='wave'
          width={100}
          height={10}
          borderRadius={49}
          marginBottom={10}
        />
        <Skeleton
          animation='wave'
          width={130}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
        <Skeleton
          animation='wave'
          width={300}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
        <Skeleton
          animation='wave'
          width={200}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
        <Skeleton
          animation='wave'
          width={250}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
        <Skeleton
          animation='wave'
          width={320}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
        <Skeleton
          animation='wave'
          width={200}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
        <Skeleton
          animation='wave'
          width={320}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
        <Skeleton
          animation='wave'
          width={200}
          height={10}
          borderRadius={49}
          marginBottom={30}
        />
      </View>
    </View>
  );
};

export default AppDetailsSkeleton;

const internalStyles = StyleSheet.create({
  clinicImage: {
    width: "100%",
    height: deviceHeight * 0.22,
    contentFit: "cover",
  },
});
