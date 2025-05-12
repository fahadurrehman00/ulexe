import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ForwardArrow from "../../../assets/images/chevron-right.svg";
import { colors } from "../../../utils/colors";
import Price from "../../../components/Price";
import { Image } from "expo-image";
import { styles } from "../../../utils/styles";
const SubServiceCard = (props) => {
  return (
    <View style={internalStyles.card}>
      <View style={internalStyles.cardLeftSide}>
        <Image
          source={
            props.serviceImage === ""
              ? require("../../../assets/images/no-image.png")
              : { uri: props.serviceImage }
          }
          style={internalStyles.image}
        />
        <View style={internalStyles.textContainer}>
          <Text style={styles.subTitle}>{props.serviceName}</Text>
          <View style={internalStyles.infoContainer}>
            <Text style={styles.mainSubTitle}>
              {props.duration.split(":")[0]}min
            </Text>
            <View style={internalStyles.dot} />
            <Price details={props} />
          </View>
        </View>
        <View style={internalStyles.arrow}>
          <ForwardArrow />
        </View>
      </View>
    </View>
  );
};

const internalStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  cardLeftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.BaseBlack,
  },
});

export default SubServiceCard;
