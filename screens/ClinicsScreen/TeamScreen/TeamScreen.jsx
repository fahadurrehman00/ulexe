import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TeamMemberCard from "./TeamMemberCard";
import { fonts } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { styles } from "../../../utils/styles";

const TeamScreen = ({ route }) => {
  const { team } = route.params;

  return (
    <View style={internalStyles.teamMembersContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainSubTitle}>
          Meet our dedicated team who are committed to providing you with
          exceptional service.
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={internalStyles.teamCardContainer}
      >
        {team.map((member) => (
          <TeamMemberCard
            key={member.team_member.id}
            memberName={member.team_member.first_name}
            avatarImage={member.team_member.profile_image}
            role={member.team_member.role}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeamScreen;

const internalStyles = StyleSheet.create({
  teamMembersContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.Neutrals,
  },
  teamCardContainer: {
    flexDirection: "row",
    paddingTop: 16,
    gap: 10,
  },
});
