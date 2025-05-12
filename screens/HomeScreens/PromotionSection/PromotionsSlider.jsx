import React, { useState, useCallback } from "react";
import { Dimensions, Linking } from "react-native";
import Carousel from "react-native-snap-carousel";
import PromotionsCard from "./PromotionsCard";

const { width: screenWidth } = Dimensions.get("window");

const PromotionsSlider = ({ navigation, services }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = useCallback(
    ({ item }) => (
      <PromotionsCard
        serviceDetails={item}
        navigation={navigation}
        onPress={() => {
          if (item.clinicPlan === "free") {
            const phoneNumber = item.clinicPhone;
            if (phoneNumber) {
              Linking.openURL(`tel:${phoneNumber}`);
            } else {
              console.error("No phone number available for this clinic.");
            }
          } else {
            navigation.navigate("ServiceDetails", {
              service: item,
            });
          }
        }}
      />
    ),
    [navigation]
  );

  return (
    <Carousel
      data={services}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth - 20}
      inactiveSlideScale={1}
      inactiveSlideOpacity={0}
      onSnapToItem={(index) => setActiveSlide(index)}
      loop={true}
    />
  );
};

export default PromotionsSlider;
