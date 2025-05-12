import React, { useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import Onboarding from "./Onboarding";
import { styles } from "../../../utils/styles";
const { width: screenWidth } = Dimensions.get("window");
import MainButton from "../../../components/MainButton";

const slides = [
  {
    key: "1",
    title: "Welcome to Ulexe!",
    subtitle:
      "Discover top skin aesthetic clinics and book appointments with ease.",
    imageSource: require("../../../assets/images/onboarding1.png"),
  },
  {
    key: "2",
    title: "Discover Clinics",
    subtitle: "Use our map to explore clinics in your area.",
    imageSource: require("../../../assets/images/onboarding2.png"),
  },
  {
    key: "3",
    title: "Appointment Booking",
    subtitle: "Choose a service, and book your appointment in just a few taps.",
    imageSource: require("../../../assets/images/onboarding3.png"),
  },
];

const Onboardings = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef(null);

  const handleContinue = () => {
    if (currentPage < slides.length - 1) {
      carouselRef.current.snapToNext();
    } else {
      navigation.navigate("Welcome");
    }
  };

  const renderItem = ({ item }) => (
    <Onboarding
      imageSource={item.imageSource}
      title={item.title}
      subtitle={item.subtitle}
      currentPage={currentPage + 1}
      handleContinue={handleContinue}
    />
  );

  return (
    <View style={styles.onboardContainer}>
      <View style={styles.onboardContainerInner}>
        <Carousel
          ref={carouselRef}
          data={slides}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={(index) => setCurrentPage(index)}
          containerCustomStyle={{}}
        />
        <View style={styles.onbaordingButtonContainer}>
          <View style={styles.indicatorContainer}>
            <View style={currentPage === 0 ? styles.activeDot : styles.dot} />
            <View style={currentPage === 1 ? styles.activeDot : styles.dot} />
            <View style={currentPage === 2 ? styles.activeDot : styles.dot} />
          </View>
          <View style={styles.onboardButton}>
            <MainButton buttonText='Continue' onPress={handleContinue} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Onboardings;