import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

const BookAppSkeleton = () => {
  return (
    <ScrollView
      style={internalStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={internalStyles.professionalsContainer}>
        <Skeleton animation='wave' width={120} height={10} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={internalStyles.professionalsScroll}
        >
          {[...Array(3)].map((_, index) => (
            <View key={index} style={internalStyles.professional}>
              <Skeleton
                animation='wave'
                width={100}
                height={100}
                borderRadius={50}
              />
              <Skeleton animation='wave' width={80} height={10} marginTop={8} marginBottom={8}/>
              <Skeleton animation='wave' width={60} height={8} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={internalStyles.monthHeader}>
        <Skeleton animation='wave' width={120} height={10} />
        <View style={internalStyles.arrowsButtonContainer}>
          <Skeleton animation='wave' width={24} height={24} borderRadius={12} />
          <Skeleton animation='wave' width={24} height={24} borderRadius={12} />
        </View>
      </View>

      <View style={internalStyles.weekDaysContainer}>
        {[...Array(7)].map((_, index) => (
          <Skeleton
            key={index}
            animation='wave'
            width={30}
            height={10}
            marginHorizontal={2}
          />
        ))}
      </View>

      <View style={internalStyles.dateContainer}>
        {[...Array(7)].map((_, index) => (
          <View key={index} style={internalStyles.dateBox}>
            <Skeleton
              animation='wave'
              width={30}
              height={30}
              borderRadius={6}
            />
          </View>
        ))}
      </View>

      <View style={internalStyles.timeSlotsContainer}>
        <Skeleton animation='wave' width={110} height={10} />
        <View style={internalStyles.timeSlots}>
          {[...Array(22)].map((_, index) => (
            <Skeleton
              key={index}
              animation='wave'
              width='17%'
              height={40}
              borderRadius={8}
              margin={5}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  professionalsContainer: {
    marginBottom: 16,
  },
  professionalsScroll: {
    marginTop: 4,
    flexDirection: "row",
  },
  professional: {
    alignItems: "center",
    marginRight: 16,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  arrowsButtonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  timeSlotsContainer: {
    marginBottom: 16,
  },
  timeSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  textAreaContainer: {
    marginTop: 16,
  },
  mainButtonContainer: {
    marginTop: 32,
    alignItems: "center",
  },
});

export default BookAppSkeleton;
