import { useCallback, useEffect, useState } from "react";
import { apiCall } from "../../utils/api";
import { useFocusEffect } from "@react-navigation/native";

const useGetBooking = ({ status, refreshing, setRefreshing }) => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(
        `/bookings?status=${status}`,
        "GET",
        null,
        true,
        {},
        "token"
      );

      if (Array.isArray(response?.data) && response?.status) {
        const formattedData = response.data.map((item) => {
          const imageUrl = item.service_image
            ? item.service_image === "[]"
              ? ""
              : JSON.parse(item.service_image)[0].replace(/\\/g, "")
            : "";

          return {
            id: item.id,
            title: item.clinic_name,
            serviceName: item.service_name,
            description: item.description,
            priceRange: item?.use_price_range,
            hasPromotion: item?.has_promotion,
            discountType: item?.discount_type,
            discount: item?.discount_value,
            minPrice: item?.min_price,
            maxPrice: item?.max_price,
            price: item?.price,
            date: item.scheduled_at_formatted,
            time: item.booking_time,
            imageSource: imageUrl,
            status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
          };
        });

        setBookingData(formattedData);
      } else if (response?.status === "Error") {
        setError(response.msg);
        setLoading(false);
        setRefreshing(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [status])
  );
  useEffect(() => {
    if (refreshing) loadData();
  }, [refreshing]);

  return { loading, bookingData, error };
};

export default useGetBooking;
