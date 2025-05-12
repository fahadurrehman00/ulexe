import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

export default function useGetAllServices({
  latitude,
  longitude,
  search,
  refreshing,
  setRefreshing,
}) {
  const [listServices, setListServices] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        `/services?with=clinic_rating&lat=${latitude}&long=${longitude}&keyword=${search}`,
        "GET"
      );
      if (Array.isArray(response?.data) && response?.status) {
        const formattedServicesData = response?.data?.map((service) => {
          const clinicImage = service.clinic_image
            ? JSON.parse(service.clinic_image)[0].replace(/\\/g, "")
            : "";
          const serviceImage = service.image_urls
            ? JSON.parse(service.image_urls)[0].replace(/\\/g, "")
            : "";

          return {
            id: service?.id,
            clinicId: service?.clinic_id,
            clinicName: service.clinic_name,
            address: service?.clinic_address,
            rating: service?.average_rating,
            reviews: service?.number_of_reviews,
            serviceName: service?.name,
            description: service?.description,
            priceRange: service?.use_price_range,
            hasPromotion: service?.has_promotion,
            discountType: service?.discount_type,
            discount: service?.discount_value,
            minPrice: service?.min_price,
            maxPrice: service?.max_price,
            price: service?.price,
            clinicPlan: service?.clinic_plan,
            clinicPhone: service?.clinic_phone_number,
            serviceImage,
            clinicImage,
          };
        });

        setListServices(formattedServicesData);
      } else if (response?.status === "Error") {
        setError(response.msg);
        setLoading(false);
        setRefreshing(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setRefreshing(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search]);

  useEffect(() => {
    if (refreshing) loadData();
  }, [search, refreshing]);

  return { loading, listServices, error };
}
