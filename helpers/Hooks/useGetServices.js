import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

const useGetServices = ({ id }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        `/services?with=clinic_rating&category_id=${id}&clinic_id=`,
        "GET"
      );
      if (Array.isArray(response?.data) && response?.status === true) {
        const formattedServicesData = response.data.map((service) => {
          const clinicImage = service.clinic_image
            ? JSON.parse(service.clinic_image)[0].replace(/\\/g, "")
            : "";
          const serviceImage = service.image_urls
            ? JSON.parse(service.image_urls)[0].replace(/\\/g, "")
            : "";
          return {
            id: service?.id,
            serviceName: service?.name,
            categoryId: service?.category_id,
            clinicId: service?.clinic_id,
            clinicName: service.clinic_name,
            address: service?.clinic_address,
            description: service?.description,
            rating: service?.average_rating,
            reviews: service?.number_of_reviews,
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
        setServices(formattedServicesData);
      } else if (response?.status === "Error") {
        setError(response.msg);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return { loading, services, error };
};

export default useGetServices;
