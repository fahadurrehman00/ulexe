import React from "react";
import { View } from "react-native";
import { Skeleton } from "@rneui/themed";

const ClinicSkeleton = () => {
  return (
    <View>
      <Skeleton animation='wave' width='100%' height={180} marginBottom={10} />
      <View style={{ padding: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              animation='wave'
              width='20%'
              height={40}
              borderRadius={6}
              marginBottom={26}
            />
          ))}
        </View>
        <View>
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              animation='wave'
              width='100%'
              height={50}
              borderRadius={6}
              marginBottom={20}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default ClinicSkeleton;
