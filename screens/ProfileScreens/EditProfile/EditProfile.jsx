import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import PhoneInput from "react-native-phone-input";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ChangeIcon from "../../../assets/images/change.svg";
import DeleteIcon from "../../../assets/images/trash.svg";
import MainButton from "../../../components/MainButton";
import InputField from "../../../components/InputField";
import { apiCall } from "../../../utils/api";
import { styles } from "../../../utils/styles";
import { Skeleton } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/font";

const EditProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [inputErrors, setInputErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiCall("/me", "GET", null, true, {}, "token");
        if (response) {
          setFormData({
            firstName: response.data.first_name || "",
            lastName: response.data.last_name || "",
            email: response.data.email || "",
            phoneNumber: response.data.phone || "",
            countryCode: response.data.country_code || "+1",
            timezone: response.data.timezone,
          });
          const imageUri = response.data.profile_image;
          setProfileImage(imageUri ? { uri: imageUri } : null);
          setOriginalImage(imageUri ? { uri: imageUri } : null);
        } else {
          displayToast("error", "Error", "Invalid response structure.");
        }
      } catch (error) {
        displayToast("error", "Error", "Failed to load your profile data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const displayToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 10,
    });
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri =
          Platform.OS === "ios"
            ? result.assets[0].uri.replace("file://", "")
            : result.assets[0].uri;
        ({ uri });
        if (inputErrors.image)
          setInputErrors((prev) => ({ ...prev, image: false }));
      }
    } catch (error) {
      displayToast("error", "Error", "Failed to pick the image.");
    }
  };

  const handleImageRemoval = () => {
    setProfileImage(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    if (inputErrors[field])
      setInputErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  const handlePhoneNumberChange = (value) => {
    const countryCode = phoneInputRef.current.getCountryCode();
    const phoneNumber = value.replace(`+${countryCode}`, "").trim();

    setFormData((prevData) => ({
      ...prevData,
      phoneNumber,
      countryCode: `+${countryCode}`,
    }));

    if (inputErrors.phoneNumber)
      setInputErrors((prev) => ({ ...prev, phoneNumber: false }));
  };

  const validateForm = () => {
    const errors = {};
    let focusField = null;

    if (!profileImage) errors.image = "Profile image is required.";
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
      if (!focusField) focusField = firstNameInputRef;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
      if (!focusField) focusField = lastNameInputRef;
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
      if (!focusField) focusField = phoneInputRef;
    }

    setInputErrors(errors);
    if (focusField) focusField.current.focus();

    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    try {
      const payLoad = new FormData();
      payLoad.append("first_name", formData.firstName);
      payLoad.append("last_name", formData.lastName);
      payLoad.append("email", formData.email);
      payLoad.append("country_code", formData.countryCode);
      payLoad.append("phone", formData.phoneNumber);

      if (profileImage && profileImage.uri !== originalImage?.uri) {
        const fileType = profileImage.uri.split(".").pop();
        payLoad.append("profile_image", {
          uri: profileImage.uri,
          name: `profile_${Date.now()}.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await apiCall(
        "/me",
        "POST",
        payLoad,
        true,
        {
          "Content-Type": "multipart/form-data",
        },
        "token"
      );

      if (response.status === "Error") {
        displayToast(
          "error",
          "Error",
          response.msg || "Failed to update profile."
        );
      } else {
        await AsyncStorage.setItem("profileImage", response.data.profile_image);
        displayToast("success", "Success", "Profile updated successfully.");
        setTimeout(() => navigation.navigate("Profile"), 2000);
      }
    } catch (error) {
      displayToast("error", "Error", "Failed to update your profile data.");
    }
  };

  const renderSkeletonLoader = () => (
    <View>
      <Skeleton
        animation='wave'
        width={130}
        height={130}
        borderRadius={90}
        marginBottom={10}
      />
      {[...Array(4)].map((_, index) => (
        <View key={index} style={{ marginBottom: 22 }}>
          <Skeleton
            animation='wave'
            width={80}
            height={10}
            borderRadius={4}
            marginBottom={10}
          />
          <Skeleton
            animation='wave'
            width='100%'
            height={50}
            borderRadius={4}
          />
        </View>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {isLoading ? (
          renderSkeletonLoader()
        ) : (
          <View>
            <Text style={styles.inputLabel}>Profile Picture</Text>
            <View style={internalStyles.imageContainer}>
              <View style={styles.imageWrapper}>
                {profileImage ? (
                  <Image
                    style={internalStyles.profileImage}
                    source={profileImage}
                  />
                ) : (
                  <TouchableOpacity
                    style={internalStyles.noImageContainer}
                    onPress={handleImagePicker}
                  >
                    <MaterialIcons name='add' size={48} color='#c3c3c3' />
                    <Text style={internalStyles.addImageText}>Add Image</Text>
                  </TouchableOpacity>
                )}
              </View>
              {profileImage && (
                <View style={internalStyles.imageActions}>
                  <TouchableOpacity
                    style={internalStyles.actionButton}
                    onPress={handleImagePicker}
                  >
                    <ChangeIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={internalStyles.deleteButton}
                    onPress={handleImageRemoval}
                  >
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text style={styles.errorText}>{inputErrors.image}</Text>

            <InputField
              inputLabel='First Name'
              value={formData.firstName}
              placeholder='First Name'
              onChangeText={(text) => handleInputChange("firstName", text)}
              ref={firstNameInputRef}
              error={inputErrors.firstName}
              errorMessage={inputErrors.firstName}
            />

            <InputField
              inputLabel='Last Name'
              value={formData.lastName}
              placeholder='Last Name'
              onChangeText={(text) => handleInputChange("lastName", text)}
              ref={lastNameInputRef}
              error={inputErrors.lastName}
              errorMessage={inputErrors.lastName}
            />

            <InputField
              inputLabel='Email Address'
              value={formData.email}
              placeholder='example@email.com'
              onChangeText={formData.email}
              keyboardType='email-address'
              editable={false}
              customStyle={styles.textBlack}
            />

            <Text style={styles.inputLabel}>Phone Number</Text>
            <PhoneInput
              ref={phoneInputRef}
              initialCountry='us'
              initialValue={`${formData.countryCode}${formData.phoneNumber}`}
              onChangePhoneNumber={handlePhoneNumberChange}
              flagStyle={{ marginLeft: 10 }}
              style={[
                styles.phoneNumberInput,
                inputErrors.phoneNumber && styles.ValidationErrorInput,
              ]}
            />
            {inputErrors.phoneNumber && (
              <Text style={styles.errorText}>{inputErrors.phoneNumber}</Text>
            )}

            <InputField
              inputLabel='Time Zone'
              value={formData.timezone}
              onChangeText={formData.timezone}
              editable={false}
              customStyle={[styles.textBlack]}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.mainButtonContainer}>
        <MainButton buttonText='Save' onPress={submitForm} />
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const internalStyles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 999,
  },
  noImageContainer: {
    width: 128,
    height: 128,
    borderRadius: 999,
    backgroundColor: colors.BaseWhite,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.Neutrals100,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageText: {
    fontFamily: fonts.semiBold,
  },
  imageActions: {
    flexDirection: "row",
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: colors.BaseWhite,
    borderColor: colors.Neutrals100,
    borderWidth: 1,
    padding: 8,
    borderRadius: 999,
    marginRight: 16,
  },
  deleteButton: {
    backgroundColor: colors.BaseWhite,
    borderColor: colors.Neutrals100,
    borderWidth: 1,
    padding: 8,
    borderRadius: 999,
  },
});
