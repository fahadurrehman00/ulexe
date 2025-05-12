import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import PromotionsSlider from "./PromotionSection/PromotionsSlider";
import CategoriesSlider from "./CategoriesSection/CategoriesSlider";
import Results from "./Results";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/font";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useGetAllServices from "../../helpers/Hooks/useGetAllServices";
import useGetPromotionalServices from "../../helpers/Hooks/useGetPromotionalServices";
import { Skeleton } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: screenWidth } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../utils/styles";

const HomeScreen = ({ search, address, latitude, longitude }) => {
  const scrollViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [checkAuth, setCheckAuth] = useState(false);

  const checkAuthStatus = async () => {
    token = await AsyncStorage.getItem("refresh_token");
    setCheckAuth(token);
  };
  useFocusEffect(
    useCallback(() => {
      checkAuthStatus();
    }, [checkAuth])
  );

  const { loading, listServices: allServices } = useGetAllServices({
    address,
    latitude,
    longitude,
    search,
    refreshing,
    setRefreshing,
  });

  const { loading: promotionLoading, services } = useGetPromotionalServices({
    address,
    latitude,
    longitude,
    search,
    refreshing,
    setRefreshing,
  });

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    search;
  }, [search]);

  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.Primary100]}
          tintColor={colors.Primary100}
        />
      }
    >
      <TouchableOpacity
        style={internalStyles.appointmentSection}
        onPress={() =>
          checkAuth
            ? navigation.navigate("Booking")
            : navigation.navigate("Signup")
        }
      >
        <Text style={internalStyles.appointmentText}>View My Appointments</Text>
        <Icon name='chevron-forward' size={11} color={colors.Primary} />
      </TouchableOpacity>
      {/* Promotions Slider */}
      {promotionLoading ? (
        <View style={internalStyles.promotionSkeleton}>
          <Skeleton
            animation='wave'
            width={screenWidth * 0.96}
            height={200}
            borderRadius={10}
          />
        </View>
      ) : (
        <PromotionsSlider services={services} navigation={navigation} />
      )}
      {/* Services Slider */}
      {!search ? <CategoriesSlider navigation={navigation} /> : null}
      {/* Results */}
      <View style={internalStyles.resultsContainer}>
        {loading ? (
          <>
            <Skeleton
              animation='wave'
              height={10}
              width={80}
              borderRadius={10}
              marginBottom={8}
            />
            <View style={internalStyles.resultsSkeleton}>
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  animation='wave'
                  style={internalStyles.skeletonCard}
                />
              ))}
            </View>
          </>
        ) : (
          <Results
            navigation={navigation}
            allServices={allServices}
            search={search}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const internalStyles = StyleSheet.create({
  appointmentSection: {
    margin: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.Primary100,
    borderColor: colors.Primary200,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  appointmentText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
  promotionSkeleton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  resultsContainer: {
    marginTop: 14,
    paddingHorizontal: 10,
  },
  resultsSkeleton: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skeletonCard: {
    width: "48%",
    height: 170,
    marginBottom: 16,
    borderRadius: 8,
  },
});
