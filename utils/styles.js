import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Platform } from "react-native";

export const styles = StyleSheet.create({
  // General styles
  container: {
    flexGrow: 1,
    padding: 8,
    justifyContent: "center",
    paddingVertical: "10%",
  },
  BookingContainer: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    padding: 8,
    backgroundColor: colors.BaseWhite,
  },
  strikethrough: {
    fontFamily: fonts.medium,
    textDecorationLine: "line-through",
    color: colors.Neutrals400,
  },
  textBlack: {
    color: "#000",
  },
  headerBackButon: {
    paddingLeft: 20,
  },
  headerMoreButton: {
    paddingRight: 20,
  },
  headerStyle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  headerBackIcon: {
    padding: 8,
    paddingLeft: 4,
    fontSize: 16,
  },
  disableButton: {
    backgroundColor: colors.Primary300,
  },
  disableCancelButton: {
    backgroundColor: colors.Error100,
  },
  floatingDiscount: {
    position: "absolute",
    left: 8,
    top: 8,
    fontSize: 14,
    backgroundColor: colors.White,
    color: colors.Primary,
    fontFamily: fonts.regular,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: "hidden",
    borderWidth: 0.4,
    borderColor: colors.Primary,
    opacity: 0.9,
  },
  floatingPrice: {
    position: "absolute",
    right: 8,
    top: 94,
    fontSize: 14,
    backgroundColor: colors.White,
    color: colors.White,
    fontFamily: fonts.bold,
    borderRadius: 4,
    paddingHorizontal: 8,
    // paddingVertical: 3,
    overflow: "hidden",
    borderRadius: 6,
    opacity: 0.9,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingContent: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    bottom: 0,
    padding: 7,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.Error200,
    marginBottom: 10,
    textAlign: "center",
  },
  emptyResponseText: {
    fontSize: 13,
    fontFamily: fonts.Italic,
    color: colors.Secondary900,
  },
  largeTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  clinicCardTitle: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  mainTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  lightTitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  smallTitle: {
    fontSize: 15,
    fontFamily: fonts.medium,
  },
  cardService: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.Secondary900,
  },
  smallSubTitle: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.Secondary900,
  },
  proName: {
    fontFamily: fonts.semiBold,
  },
  cardTitle: {
    fontFamily: fonts.semiBold,
  },
  subTitle: {
    fontFamily: fonts.semiBold,
    color: colors.Secondary900,
  },
  mainSubTitle: {
    fontFamily: fonts.medium,
    color: colors.Secondary900,
  },
  paragraphText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.Secondary900,
  },
  contentText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.Neutrals700,
  },
  detailsHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: colors.Primary100,
  },
  detailsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderColor: colors.Primary100,
  },
  detailsDescription: {
    paddingTop: 16,
    gap: 6,
  },
  headingContainer: {
    paddingVertical: 8,
  },
  placeholderImage: {
    height: 180,
    resizeMode: "contain",
  },
  // Main Button
  mainButtonContainer: {
    backgroundColor: colors.BaseWhite,
    paddingHorizontal: 8,
    paddingBottom: 18,
    paddingTop: 8,
  },
  mainButton: {
    backgroundColor: colors.Primary,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
  },
  mainButtonText: {
    fontSize: 15,
    color: colors.BaseWhite,
    fontFamily: fonts.medium,
  },
  inputLabel: {
    width: "50%",
    fontSize: 14,
    marginBottom: 6,
    color: colors.BaseBlack,
    fontFamily: fonts.semiBold,
  },
  // Secondary Button
  detailsButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 8,
    height: 35,
    width: 90,
    borderColor: colors.Primary,
  },
  detailsButtonText: {
    fontSize: 14,
    color: colors.Primary,
    fontFamily: fonts.semiBold,
  },
  // InputField
  inputContainer: {
    borderColor: colors.Neutrals100,
    backgroundColor: colors.BaseWhite,
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  inputContainerErrorWrapper: {
    marginBottom: 0,
  },
  inputText: {
    width: "100%",
    fontSize: 14,
    fontFamily: fonts.regular,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // Error Field
  ValidationErrorInput: {
    backgroundColor: "#FDECEA",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginLeft: 3,
    marginTop: 3,
  },
  // Password Field
  passwordFieldContainer: {
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    width: "98%",
    fontFamily: fonts.medium,
    fontSize: 14,
    paddingHorizontal: 16,
  },
  eyeIcon: {
    fontSize: 18,
    padding: 12,
    color: colors.Neutrals500,
  },
  // Popup Verification
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "92%",
    padding: 26,
    backgroundColor: colors.BaseWhite,
    borderRadius: 8,
    alignItems: "center",
  },
  popupHeading: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.BaseBlack,
    marginBottom: 15,
  },
  popupParagraph: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
    fontFamily: fonts.medium,
    color: colors.Neutrals700,
  },
  popupButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  popupButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    zIndex: 9,
  },
  popupCancelButton: {
    backgroundColor: colors.Secondary200,
  },
  popupCancelButtonText: {
    color: colors.BaseBlack,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  popupConfirmButton: {
    backgroundColor: colors.Error200,
  },
  popupButtonText: {
    color: colors.BaseWhite,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  // Onboarding Screens
  onboardContainer: {
    flex: 1,
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("5%"),
  },
  onboardContainerInner: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  onboardImage: {
    width: wp("100%"),
    height: hp("60%"),
    resizeMode: "contain",
    marginBottom: 16,
  },
  onboardTextContainer: {
    paddingHorizontal: 16,
    marginBottom: hp("2.5%"),
  },
  onboardTitle: {
    fontSize: wp("7.5%"),
    fontFamily: fonts.bold,
    marginBottom: hp("2%"),
  },
  onboardSubtitle: {
    color: colors.Neutrals700,
    fontFamily: fonts.regular,
    fontSize: wp("5%"),
    lineHeight: hp("3.5%"),
  },
  onbaordingButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4.5%"),
    justifyContent: "space-between",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: wp("2.5%"),
  },
  dot: {
    width: wp("3%"),
    height: wp("3%"),
    borderRadius: wp("6.25%"),
    backgroundColor: colors.Primary100,
  },
  activeDot: {
    width: wp("3%"),
    height: wp("3%"),
    borderRadius: wp("7.5%"),
    backgroundColor: colors.Primary,
  },
  onboardButton: {
    width: wp("45%"),
  },

  // Authorization Screens
  authContainer: {
    marginBottom: hp("1.25%"),
  },
  authHeading: {
    fontSize: wp("6%"),
    color: colors.BaseBlack,
    fontFamily: fonts.bold,
  },
  authDes: {
    fontFamily: fonts.regular,
    color: colors.Neutrals700,
    fontSize: wp("4%"),
  },
  forgotPasswordText: {
    textAlign: "center",
    color: colors.BaseBlack,
    fontSize: wp("3.5%"),
    fontFamily: fonts.regular,
    marginBottom: hp("2.5%"),
    marginTop: hp("1.25%"),
  },
  recoverLink: {
    fontFamily: fonts.bold,
  },
  authLinkText: {
    textAlign: "center",
    marginTop: hp("5%"),
    color: colors.BaseBlack,
    fontFamily: fonts.regular,
  },
  authLink: {
    textAlign: "center",
    color: colors.BaseBlack,
    fontFamily: fonts.bold,
  },
  // Forget Password
  forgetContainer: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  forgetInputContainer: {
    marginTop: 40,
  },
  rememberedText: {
    textAlign: "center",
    fontFamily: fonts.regular,
    color: colors.BaseBlack,
    marginTop: 30,
  },
  signInLink: {
    textAlign: "center",
    color: colors.BaseBlack,
    fontFamily: fonts.bold,
  },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 8 : 8,
    left: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Primary100,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
  },
  textInput: {
    flex: 1,
    height: 39,
    fontSize: 14,
    color: "black",
  },
  mapContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 2,
    alignItems: "center",
  },
  resendOTPButton: {
    backgroundColor: colors.BaseBlack,
  },
  // Social Buttons
  socialButtonContainer: {
    gap: 16,
    marginBottom: 16,
    flexDirection: "row",
  },
  socialButton: {
    backgroundColor: colors.BaseWhite,
    borderColor: colors.Primary100,
    borderWidth: 1,
    borderRadius: 99,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: 40,
    height: 40,
    shadowColor: colors.Neutrals400,
    elevation: 3,
    gap: 8,
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  socialButtonText: {
    color: colors.BaseBlack,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    paddingLeft: 8,
    fontSize: 14,
    color: colors.BaseBlack,
    borderColor: colors.Neutrals100,
    backgroundColor: colors.BaseWhite,
    fontFamily: fonts.medium,
    height: 50,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  codeInput: {
    height: 50,
    width: 50,
    borderColor: colors.Neutrals100,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.bold,
    backgroundColor: colors.BaseWhite,
  },
  imageWrapper: {
    borderRadius: 99,
    borderWidth: 4,
    borderColor: colors.BaseWhite,
    overflow: "hidden",
  },
  AddAppointmentConfrimBookingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  AppointmentDetailsSeparator: {
    borderBottomColor: colors.Neutrals100,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  AppointmentDetailsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  AppointmentDetailsTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  AppointmentDetailsSubtitle: {
    fontFamily: fonts.regular,
  },
  grayText: {
    color: colors.Neutrals800,
  },
  AppointmentDetailsSubtitle: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.regular,
    color: colors.Neutrals800,
  },
  AppointmentDetailsButtonUpcoming: {
    borderColor: colors.Warning200,
  },
  AppointmentDetailsButtonUpcominText: {
    color: colors.Warning200,
  },
  AddAppointmentConfrimBookingServiceTitle: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  AddAppointmentConfrimBookingDuration: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.Neutrals900,
  },
  AddAppointmentConfrimBookingPrice: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  AddAppointmentConfrimBookingLabel: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
  AddAppointmentConfrimBookingValue: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  // Cancellation Reason

  cancellationReasonContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  cancellationReasonSelectList: {
    marginBottom: 20,
    borderColor: colors.Neutrals200,
    fontFamily: fonts.medium,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: colors.White,
  },
  placeholderStyles: {
    fontFamily: fonts.medium,
  },
  cancellationReasonSelectListDropdown: {
    borderColor: colors.Neutrals200,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: colors.White,
  },
  cancellationReasonTextArea: {
    borderColor: colors.Neutrals200,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlignVertical: "top",
    backgroundColor: colors.White,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  cancellationButton: {
    backgroundColor: colors.Primary500,
    fontFamily: fonts.bold,
  },
  buttonContainer: {
    paddingHorizontal: 0,
    paddingBottom: 80,
  },
  errorButton: {
    backgroundColor: colors.Error200,
  },
  // Empty Screen
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContent: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
});
