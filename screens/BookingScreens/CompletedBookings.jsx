import React, { useCallback, useRef, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../utils/styles";
import { colors } from "../../utils/colors";
import BookingCard from "../../components/BookingCard";
import useGetBooking from "../../helpers/Hooks/useGetBookings";
import BookingsSkeleton from "../../components/Skeletons/BookingsSkeleton";
import EmptyBookingScreen from "./EmptyBookingScreen";

const CompletedBookings = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);

  const { loading, bookingData } = useGetBooking({
    status: "Completed",
    refreshing,
    setRefreshing,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "#EDA145";
      case "Cancelled":
        return "#FF6347";
      case "Completed":
        return "#32CD32";
      default:
        return "#A9A9A9";
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  if (loading) {
    return <BookingsSkeleton />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      directionalLockEnabled={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.Primary100]}
          tintColor={colors.Primary100}
        />
      }
    >
      <View style={styles.BookingContainer}>
        {bookingData.length === 0 ? (
          <EmptyBookingScreen />
        ) : (
          <>
            <View style={styles.headingContainer}>
              <Text style={styles.mainSubTitle}>
                Following are the appointments you have completed.
              </Text>
            </View>
            {bookingData.map((item) => (
              <BookingCard
                key={item.id}
                bookingDetails={item}
                navigation={navigation}
                statusColor={getStatusColor(item.status)}
              />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default CompletedBookings;
