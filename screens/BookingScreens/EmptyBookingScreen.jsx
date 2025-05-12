import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../../utils/styles";
import MainButton from "../../components/MainButton";
import notFound from "../../assets/images/notfoundbooking.png";
import { useNavigation } from "@react-navigation/native";

const EmptyBookingScreen = () => {
  const navigation = useNavigation();
  const handleExplorePress = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.noDataContent}>
        <Image source={notFound} style={styles.placeholderImage} />
        <Text style={[styles.mainTitle, { marginBottom: 6 }]}>
          No Appointments Scheduled
        </Text>
        <Text style={[styles.paragraphText, { paddingHorizontal: 20 }]}>
          You haven't scheduled any appointments yet.{"\n"}Tap here to explore
          our services and book your first appointment!
        </Text>
      </View>
      <MainButton buttonText='Explore Services' onPress={handleExplorePress} />
    </View>
  );
};

export default EmptyBookingScreen;
