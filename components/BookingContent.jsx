import { Text, View } from "react-native";
import React from "react";
import { styles } from "../utils/styles";
import Price from "./Price";

const BookingContent = ({ data }) => {
  return (
    <>
      <View style={styles.detailsRow}>
        <Text style={styles.cardTitle}>Service:</Text>
        <Text style={styles.mainSubTitle}>{data.serviceName}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.cardTitle}>Price:</Text>
        <Price details={data} />
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.cardTitle}>Professional:</Text>
        <Text style={styles.mainSubTitle}>{data.teamMember}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.cardTitle}>Date & Time:</Text>
        <Text style={styles.mainSubTitle}>{data.bookingDate}</Text>
      </View>
      {data.description && (
        <View style={styles.detailsDescription}>
          <Text style={styles.cardTitle}>Description:</Text>
          <Text style={[styles.paragraphText]}>{data.description}</Text>
        </View>
      )}
    </>
  );
};

export default BookingContent;
