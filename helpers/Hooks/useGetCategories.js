import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {

      const response = await apiCall( `/categories`,"GET");
      if (Array.isArray(response?.data)  && response?.status) {
        setCategories(
          response.data.map((category) => {
            let imageUrl = "";
            if (Array.isArray(category.image_url)) {
              imageUrl = category.image_url.length === 0 ? "" : category.image_url[0];
              imageUrl = imageUrl.replace(/\\/g, "");
            } else {
              imageUrl = category.image_url ? category.image_url : "";
            }

            return {
              id: category.id,
              title: category.name,
              image: imageUrl,
            };
          })
        );
      }  else if(response?.status ==='Error') {
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
  }, []);

  return { loading, categories, error };
};

export default useGetCategories;
