import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../utils/styles";
import { colors } from "../../utils/colors";
import BookingCard from "../../components/BookingCard";
import useGetBooking from "../../helpers/Hooks/useGetBookings";
import BookingsSkeleton from "../../components/Skeletons/BookingsSkeleton";
import EmptyBookingScreen from "./EmptyBookingScreen";

const CancelledBookings = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const { loading, bookingData, error } = useGetBooking({
    status: "Cancelled",
    refreshing,
    setRefreshing,
  });

  const hasBookings = bookingData.length > 0;

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return "#C03744";
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Something went wrong while fetching your cancelled bookings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.BookingContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
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
        {!hasBookings ? (
          <EmptyBookingScreen />
        ) : (
          <>
            <View style={styles.headingContainer}>
              <Text style={styles.mainSubTitle}>
                Here are the appointments you have cancelled.
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
      </ScrollView>
    </View>
  );
};

export default CancelledBookings;
