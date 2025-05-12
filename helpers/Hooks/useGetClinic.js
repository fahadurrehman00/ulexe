import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

const useGetClinic = ({ id }) => {
  const [clinic, setClinic] = useState({});
  const [error, setError] = useState();
  const loadData = async () => {
    try {
      const response = await apiCall(`/clinics/${id}?with=allinfo`, "GET");
      if (
        response?.data &&
        Object.keys(response.data).length > 0 &&
        response?.status
      ) {
        const { data } = response;
        setClinic({
          basicInfo: {
            clinicId: data?.id,
            clinicImage: data?.image_urls
              ? JSON.parse(data?.image_urls)[0].replace(/\\/g, "")
              : "",
            clinicName: data?.name,
            address: data?.address ? data?.address : "Address not available",
            rating: data?.rating?.average_rating,
            reviews: data?.rating?.number_of_reviews,
          },
          categories: response.data?.services?.map((category) => ({
            id: category?.category_id,
            title: category?.category_name,
            options: category?.services?.map((service) => {
              const imgArr = service.image_urls
                ? JSON.parse(service.image_urls)
                : [];
              let imageUrl =
                Array.isArray(imgArr) && imgArr.length > 0
                  ? imgArr[0]
                  : service.image_urls;
              imageUrl = imageUrl.replace(/\\/g, "");

              return {
                clinicId: id,
                id: service?.id,
                serviceName: service?.name,
                duration: service?.service_time ? service.service_time : "30",
                priceRange: service?.use_price_range,
                hasPromotion: service?.has_promotion,
                discountType: service?.discount_type,
                discount: service?.discount_value,
                minPrice: service?.min_price,
                maxPrice: service?.max_price,
                price: service?.price,
                serviceImage: imageUrl,
                clinicPlan: data?.plan,
                clinicPhone: data?.country_code + data.phone,
                description: service.description,
              };
            }),
          })),

          reviews: data.reviews.map((review) => ({
            reviewer_name: review.reviewer_name,
            avatar_initials: review.avatar_initials,
            created_at: review.created_at_formatted,
            rating: review.rating,
            comment: review.comment,
          })),
          hours: data.hours.map((hour) => ({
            day: hour.day_of_week,
            active: hour.active,
            time: `${hour.start_time} - ${hour.end_time}`,
            isClosed: !hour.is_open,
          })),
          team: data.team_members.map((member) => ({
            team_member: {
              id: member.id,
              first_name: member.name,
              profile_image: member.profile_image
                ? member.profile_image
                : "https://quintessentially.com/assets/noted/Header-1_2023-11-28-115744_dhxd.webp",
              role: member.role,
            },
          })),
          about: {
            name: data.name,
            description: data.description,
            phone: `${data.phone}`,
            instagram: data.instagram_link,
            website: data.website,
            address: data.address,
            country_code: data.country_code,
          },
        });
      } else if (response?.status === "Error") {
        setError(response.msg);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    loadData();
  }, [id]);
  return { error, clinic };
};

export default useGetClinic;
