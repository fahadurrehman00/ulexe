import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { fonts } from "../../../utils/font";
import { colors } from "../../../utils/colors";

const PrivacyPolicies = () => {
  return (
    <ScrollView style={internalStyles.privacyContainer}>
      <View>
        <Text style={internalStyles.heading}>
          Privacy Policy for Ulexe Aesthetics
        </Text>
        <Text style={internalStyles.date}>Effective Date: 02/24/2024</Text>

        <Text style={internalStyles.paragraph}>
          At Ulexe Aesthetics, we prioritize your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, disclose, and safeguard your data when you use our
          mobile application ("App") to book appointments at various clinics. By
          using our App, you agree to the collection and use of information in
          accordance with this policy.
        </Text>

        <Text style={internalStyles.heading}>1. Information We Collect</Text>
        <Text style={internalStyles.paragraph}>
          <Text style={internalStyles.bold}>a. Personal Information:</Text> When
          you create an account or book an appointment through Ulexe Aesthetics,
          we may collect personal information, including your name, email
          address, phone number, and payment details. We may also collect
          information related to your skin concerns or preferences, if you
          choose to provide them.
        </Text>
        <Text style={internalStyles.paragraph}>
          <Text style={internalStyles.bold}>b. Non-Personal Information:</Text>{" "}
          We may collect non-personal information about your device, including
          IP address, browser type, operating system, and App usage data.
        </Text>

        <Text style={internalStyles.heading}>
          2. How We Use Your Information
        </Text>
        <Text style={internalStyles.paragraph}>
          We use the information we collect for the following purposes:
          <Text style={internalStyles.listItem}>
            - To Provide and Improve Services
          </Text>
          <Text style={internalStyles.listItem}>- Communication</Text>
          <Text style={internalStyles.listItem}>- Security and Compliance</Text>
          <Text style={internalStyles.listItem}>- Analytics</Text>
        </Text>

        <Text style={internalStyles.heading}>
          3. Information Sharing and Disclosure
        </Text>
        <Text style={internalStyles.paragraph}>
          We may share your information with:
          <Text style={internalStyles.listItem}>- Clinics</Text>
          <Text style={internalStyles.listItem}>- Service Providers</Text>
          <Text style={internalStyles.listItem}>- Legal Obligations</Text>
        </Text>

        <Text style={internalStyles.heading}>4. Data Security</Text>
        <Text style={internalStyles.paragraph}>
          We implement appropriate technical and organizational measures to
          protect your data from unauthorized access, alteration, disclosure, or
          destruction. We use encryption and secure servers to safeguard your
          information.
        </Text>

        <Text style={internalStyles.heading}>5. Your Choices and Rights</Text>
        <Text style={internalStyles.paragraph}>
          - Access and Correction: You can access and update your personal
          information by logging into your account or contacting us directly.
          <Text style={internalStyles.listItem}>
            - Deletion: You may request the deletion of your personal
            information at any time.
          </Text>
          <Text style={internalStyles.listItem}>
            - Opt-Out: You can opt out of receiving marketing communications
            from us.
          </Text>
        </Text>

        <Text style={internalStyles.heading}>6. Children's Privacy</Text>
        <Text style={internalStyles.paragraph}>
          Our services are not intended for individuals under the age of 18. We
          do not knowingly collect or solicit personal information from anyone
          under 18. If we become aware that we have collected personal
          information from a child, we will delete it promptly.
        </Text>

        <Text style={internalStyles.heading}>
          7. Changes to This Privacy Policy
        </Text>
        <Text style={internalStyles.paragraph}>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. Any changes will be posted on
          this page with an updated effective date. Your continued use of the
          App following any changes constitutes your acceptance of the revised
          policy.
        </Text>

        <Text style={internalStyles.heading}>8. Contact Us</Text>
        <Text style={internalStyles.paragraph}>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at support@Ulexe-aesthetics.com.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicies;

const internalStyles = StyleSheet.create({
  privacyContainer: {
    flex: 1,
    padding: 8,
    marginBottom: 16,
  },
  date: {
    color: colors.Neutrals900,
    fontFamily: fonts.regular,
    marginBottom: 8,
  },
  paragraph: {
    color: colors.Neutrals900,
    fontFamily: fonts.regular,
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    color: colors.Neutrals900,
    fontFamily: fonts.bold,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  listItem: {
    marginLeft: 16,
  },
});
