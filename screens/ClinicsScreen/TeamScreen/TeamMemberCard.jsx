import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { styles } from "../../../utils/styles";
import { colors } from "../../../utils/colors";

const TeamMemberCard = ({ memberName, avatarImage, role }) => {
  return (
    <View>
      <View style={internalStyles.cardContainer}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 99,
            borderColor: colors.Primary100,
          }}
        >
          <Image
            style={internalStyles.teamMemberAvatar}
            source={
              avatarImage === ""
                ? require("../../../assets/images/avatar.jpg")
                : { uri: avatarImage }
            }
          />
        </View>
        <View style={internalStyles.teamMemberTextContainer}>
          <Text style={styles.proName}>{memberName}</Text>
          <Text style={styles.mainSubTitle}>
            {role === "business_owner" ? "admin" : role}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TeamMemberCard;

const internalStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  teamMemberAvatar: {
    width: 99,
    height: 99,
    borderRadius: 99,
  },
  teamMemberTextContainer: {
    alignItems: "center",
    width: "100%",
  },
});
