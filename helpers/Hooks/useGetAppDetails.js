import { useCallback, useEffect, useState } from "react";
import { apiCall } from "../../utils/api";
import { useFocusEffect } from "@react-navigation/native";

export default function useGetAppDetails({ bookingId }) {
  const [appointmentData, setAppointmentData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        `/bookings/${bookingId}?with=clinic`,
        "GET",
        null,
        true,
        {},
        "token"
      );

      if (response?.status && response?.data) {
        const data = response.data;
        const imageUrl = data.clinic.image_urls
          ? JSON.parse(data.clinic.image_urls)[0].replace(/\\/g, "")
          : "";
        const serviceImage = data.service_image
          ? JSON.parse(data.service_image)[0].replace(/\\/g, "")
          : "";
        const formattedData = {
          ...data,
          clinicName: data?.clinic?.name || "Unknown Clinic",
          clinicId: data?.clinic?.id,
          address: data?.clinic?.address,
          serviceName: data?.service_name,
          bookingId: data?.id,
          catId: data?.category_id,
          priceRange: data?.use_price_range,
          hasPromotion: data?.has_promotion,
          discountType: data?.discount_type,
          discount: data?.discount_value,
          minPrice: data?.min_price,
          maxPrice: data?.max_price,
          price: data?.price,
          status: data?.status ? capitalize(data.status) : "Unknown",
          clinicImage: imageUrl,
          rating: data?.clinic?.average_rating,
          reviews: data?.clinic?.number_of_reviews,
          teamMember: data?.staff_name,
          bookingDate: data?.scheduled_at_formatted,
          allowCancellation: data?.allow_cancellation,
          feedbackGiven: data?.feedback_given,
          description: data?.description,
          serviceImage,
        };

        setAppointmentData(formattedData);
        setStatus(formattedData.status);
      } else if (response?.status === "Error") {
        setError(response.msg);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [bookingId])
  );
  return { loading, appointmentData, error, status };
}
