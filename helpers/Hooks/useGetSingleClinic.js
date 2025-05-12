import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

export default function useGetSingleClinic({ id }) {
  const [clinic, setClinic] = useState({});
  const [error, setError] = useState( );
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);

    try {
      const response = await apiCall(`/clinics/${id}?with=rating`, "GET");

      if (response?.data && Object.keys(response.data).length > 0 && response?.status) {
        const { data } = response;
        const imageUrl = data.image_urls
          ? JSON.parse(data.image_urls)[0].replace(/\\/g, "")
          : "";

        setClinic({
          clinicImage: imageUrl,
          clinicName: data.name,
          address: data.address,
          rating: data.average_rating,
          reviews: data.number_of_reviews,
        });
      } else if(response?.status ==='Error') {
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
  return { error, loading, clinic };
}
