import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import MainButton from "../../../components/MainButton";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../utils/styles";
import Price from "../../../components/Price";

const ConfirmedAppointment = ({ navigation, route }) => {
  const { date, time, professionalName, serviceDetails, description } =
    route.params;
  return (
    <View style={internalStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={internalStyles.contentContainer}
      >
        <View style={internalStyles.headerContent}>
          <Image
            source={require("../../../assets/images/confrim.png")}
            style={internalStyles.image}
          />
          <Text style={[styles.smallTitle, internalStyles.textCenter]}>
            Your booking has been confirmed!
          </Text>
        </View>
        <View style={styles.detailsHeader}>
          <Text style={styles.smallTitle}>Appointment Details:</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.cardTitle}>Service:</Text>
          <Text style={styles.mainSubTitle}>{serviceDetails.serviceName}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.cardTitle}>Price:</Text>
          <Price details={serviceDetails} />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.cardTitle}>Professional:</Text>
          <Text style={styles.mainSubTitle}>{professionalName}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.cardTitle}>Date & Time:</Text>
          <Text style={styles.mainSubTitle}>
            {date},{time}
          </Text>
        </View>
        {description ? (
          <View style={styles.detailsDescription}>
            <Text style={styles.cardTitle}>Description:</Text>
            <Text
              style={[
                styles.paragraphText,
                !description && styles.emptyResponseText,
              ]}
            >
              Description not added to booking!
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.mainButtonContainer}>
        <MainButton
          buttonText='See All Bookings'
          onPress={() =>
            navigation.navigate("MainScreen", { screen: "Booking" })
          }
        />
      </View>
    </View>
  );
};

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    padding: 8,
  },
  headerContent: {
    alignItems: "center",
    marginBottom: 24,
  },
  textCenter: {
    textAlign: "center",
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 12,
  },
});

export default ConfirmedAppointment;
