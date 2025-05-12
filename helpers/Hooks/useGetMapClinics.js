import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

export default function useGetMapClinics({ lat, lng, searchKeyword }) {
  const [clinic, setClinic] = useState([]);
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await apiCall(`/clinics?with=rating`, "GET");
      if (
        response?.data &&
        Object.keys(response.data).length > 0 &&
        response?.status
      ) {
        const { data } = response;

        setClinic(
          data.map((clinic) => {
            const imageUrl = clinic?.image_urls
              ? JSON.parse(clinic?.image_urls)[0].replace(/\\/g, "")
              : "";
            return {
              id: clinic?.id,
              img: imageUrl,
              name: clinic?.name,
              address: clinic?.address,
              rating: clinic?.average_rating,
              reviews: clinic?.number_of_reviews,
              latitude: clinic?.latitude,
              longitude: clinic?.longitude,
            };
          })
        );
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
  }, [lat, lng]);
  return { error, loading, clinic };
}
