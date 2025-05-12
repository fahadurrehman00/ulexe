import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
} from "react-native";
import { colors } from "../../../utils/colors";
import MainButton from "../../../components/MainButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { fonts } from "../../../utils/font";
import { styles } from "../../../utils/styles";
import useGetAppointment from "../../../helpers/Hooks/useGetAppointment";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";
import BookAppSkeleton from "../../../components/Skeletons/BookAppSkeleton";
import finalPrice from "../../../utils/finalPrice";
const BookAppointment = ({ navigation, route }) => {
  const [currentDate, setCurrentDate] = useState();
  const { service } = route.params;
  const { loading, appointmentData } = useGetAppointment({
    serviceId: service.id,
    date: currentDate,
    clinicId: service.clinicId,
  });

  const [selectedDate, setSelectedDate] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState();
  const [slots, setSlots] = useState([]);
  const [desValue, setDesValue] = useState("");
  const descriptionInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    if (Object.keys(appointmentData).length > 0 && !selectedProfessionalId) {
      setSelectedProfessionalId(appointmentData.professional[0].id);
    }
  }, [appointmentData, selectedProfessionalId]);
  const handleNextWeek = () => {
    setCurrentDate(appointmentData.next_date);
    setSelectedDay();
  };

  useEffect(() => {
    if (selectedProfessionalId && Object.keys(appointmentData).length > 0) {
      if (!appointmentData.timeslots[selectedProfessionalId]?.clinic_is_open) {
        setSelectedTime();
      }

      setSlots(
        !appointmentData.timeslots[selectedProfessionalId]?.clinic_is_open
          ? []
          : appointmentData.timeslots[selectedProfessionalId]?.time_slots?.map(
              (slot) => ({
                booking_time: slot.booking_time,
                is_open: slot.is_open,
                isDisabled: slot.isDisabled,
              })
            )
      );
    }
  }, [selectedProfessionalId, appointmentData]);

  const handlePrevWeek = () => {
    if (appointmentData.previous_date === "") return;
    setCurrentDate(appointmentData.previous_date);
    setSelectedDay();
  };

  const formatDate = (date, dayOfWeek) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const weekdays = {
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
      Sun: "Sunday",
    };

    const [year, month, day] = date.split("-");
    const monthName = months[parseInt(month, 10) - 1];
    const weekdayName = weekdays[dayOfWeek];
    return `${weekdayName} ${parseInt(day, 10)} ${monthName}`;
  };

  const handleConfirmBooking = async () => {
    const selectedProfessional = appointmentData.professional.find(
      (pro) => pro.id === selectedProfessionalId
    );
    const { date, dayOfWeek } = appointmentData.calendar_dates.find(
      (date) => date.isSelected === true
    );
    const day = appointmentData.calendar_dates.find((date) =>
      date.date === selectedDate ? selectedDate : date
    ).dayOfWeek;
    const formattedDate = selectedDate
      ? formatDate(selectedDate, day)
      : formatDate(date, dayOfWeek);

    navigation.navigate("ConfirmAppointment", {
      serviceDetails: service,
      serviceId: service.id,
      clinicId: service.clinicId,
      description: desValue,
      serviceName: service.title,
      price: finalPrice(service),
      date: formattedDate,
      time: selectedTime,
      formattedDate: selectedDate ? selectedDate : date,
      teamId: selectedProfessionalId,
      professionalName: selectedProfessional ? selectedProfessional.name : null,
    });
  };

  const handleDateSelection = (date, all) => {
    setSelectedDate(all.date);
    setCurrentDate(all.date);
    setSelectedDay(date);
  };

  const handleFocusDescription = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleProfessionalSelection = (id) => {
    setSelectedProfessionalId(id);
  };

  return Object.keys(appointmentData).length > 0 && !loading ? (
    <KeyboardAvoidingView
      style={internalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={internalStyles.container}>
          <View style={internalStyles.container}>
            <View style={internalStyles.professionalsContainer}>
              <Text style={styles.mainTitle}>Select Professional:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={internalStyles.professionalsScroll}
              >
                {appointmentData.professional.map((pro) => (
                  <TouchableOpacity
                    key={pro.id}
                    style={internalStyles.professional}
                    onPress={() => handleProfessionalSelection(pro.id)}
                  >
                    <View
                      style={[
                        internalStyles.proImageContainer,
                        selectedProfessionalId === pro.id &&
                          internalStyles.selectedProfessional,
                      ]}
                    >
                      <Image
                        source={
                          pro.img === ""
                            ? require("../../../assets/images/no-image.png")
                            : { uri: pro.img }
                        }
                        style={[internalStyles.professionalImage]}
                        transition={500}
                        cachePolicy='memory'
                      />
                    </View>
                    <Text style={styles.proName}>{pro.name}</Text>
                    <Text style={styles.mainSubTitle}>
                      {pro.role === "business_owner" ? "admin" : pro.role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Date & Time Selection */}
            <View style={internalStyles.monthHeader}>
              <Text style={styles.mainTitle}>
                {appointmentData.month_and_year}
              </Text>
              <View style={internalStyles.arrowsButtonContainer}>
                <TouchableOpacity
                  disabled={appointmentData.previous_date === ""}
                  onPress={handlePrevWeek}
                  style={
                    appointmentData.previous_date === ""
                      ? ""
                      : internalStyles.arrowButton
                  }
                >
                  <MaterialCommunityIcons
                    name='chevron-left'
                    size={24}
                    color={
                      appointmentData.previous_date === "" ? "gray" : "black"
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextWeek}
                  style={internalStyles.arrowButton}
                >
                  <MaterialCommunityIcons name='chevron-right' size={24} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={internalStyles.weekDaysContainer}>
              {appointmentData.calendar_dates.map((day, index) => (
                <Text key={index} style={internalStyles.weekDayText}>
                  {day.dayOfWeek}
                </Text>
              ))}
            </View>

            <View style={internalStyles.dateContainer}>
              {appointmentData.calendar_dates.map((date, index) => (
                <TouchableOpacity
                  disabled={date.isDisabled}
                  key={index}
                  style={[
                    internalStyles.dateBox,
                    selectedDay && selectedDay === date.day
                      ? internalStyles.selectedSlotsBox
                      : !selectedDay &&
                        appointmentData.calendar_dates.find(
                          (date) => date.isSelected === true
                        ).day === date.day
                      ? internalStyles.selectedSlotsBox
                      : "",
                    date.isDisabled && internalStyles.disabledSlotsBox,
                  ]}
                  onPress={() => handleDateSelection(date.day, date)}
                >
                  <Text
                    style={[
                      internalStyles.slotsText,
                      selectedDay && selectedDay === date.day
                        ? internalStyles.selectedSlotsText
                        : !selectedDay &&
                          appointmentData.calendar_dates.find(
                            (date) => date.isSelected === true
                          ).day === date.day
                        ? internalStyles.selectedSlotsText
                        : "",
                      date.isDisabled && internalStyles.disabledSlotsText,
                    ]}
                  >
                    {date.day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Time Slots */}
            <View style={internalStyles.timeSlotsContainer}>
              <Text style={styles.mainTitle}>Time Slots</Text>
              <View style={internalStyles.timeSlots}>
                {slots.length === 0 ? (
                  <Text style={internalStyles.weekDayText}>
                    Sorry we are closed today!
                  </Text>
                ) : (
                  <FlatList
                    data={slots}
                    numColumns={5}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        disabled={item.isDisabled}
                        style={[
                          internalStyles.timeSlotBox,
                          selectedTime === item.booking_time &&
                            internalStyles.selectedSlotsBox,
                          item.isDisabled && internalStyles.disabledSlotsBox,
                        ]}
                        onPress={() =>
                          !item.isDisabled && setSelectedTime(item.booking_time)
                        }
                      >
                        <Text
                          style={[
                            internalStyles.slotsText,
                            selectedTime === item.booking_time &&
                              internalStyles.selectedSlotsText,
                            item.isDisabled && internalStyles.disabledSlotsText,
                          ]}
                        >
                          {item.booking_time}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
              {slots.length > 0 && (
                <View styles={internalStyles.textAreaContainer}>
                  <Text style={styles.mainTitle}>Description:</Text>
                  <TextInput
                    style={internalStyles.textArea}
                    multiline={true}
                    value={desValue}
                    onChangeText={setDesValue}
                    placeholderTextColor={colors.Neutrals300}
                    numberOfLines={6}
                    maxLength={400}
                    placeholder='Description'
                    ref={descriptionInputRef}
                    onFocus={handleFocusDescription}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.mainButtonContainer}>
        <MainButton
          disabled={!selectedTime}
          buttonText='Confirm Booking'
          onPress={handleConfirmBooking}
          customStyle={[!selectedTime && styles.disableButton]}
        />
      </View>
      <Toast />
    </KeyboardAvoidingView>
  ) : (
    <BookAppSkeleton />
  );
};

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  professionalsContainer: {
    marginTop: 6,
    paddingLeft: 8,
    marginBottom: 12,
  },
  professionalsScroll: {
    flexDirection: "row",
    marginTop: 8,
  },
  professional: {
    alignItems: "center",
    marginRight: 8,
  },
  proImageContainer: {
    borderRadius: 99,
    zIndex: 1,
    overflow: "hidden",
    marginBottom: 4,
    borderWidth: 2,
    borderColor: colors.Primary100,
  },
  professionalImage: {
    width: 100,
    height: 100,
  },
  selectedProfessional: {
    borderColor: colors.Primary,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingHorizontal: 16,
  },
  arrowsButtonContainer: {
    flexDirection: "row",
    gap: 6,
  },
  arrowText: {
    fontSize: 24,
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.Primary100,
    marginBottom: 4,
    padding: 6,
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.regular,
    color: colors.Neutrals600,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  dateBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.Secondary100,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSlotsBox: {
    backgroundColor: colors.Primary,
  },
  slotsText: {
    fontFamily: fonts.medium,
  },
  selectedSlotsText: {
    fontFamily: fonts.bold,
    color: colors.BaseWhite,
  },
  timeSlotsContainer: {
    paddingHorizontal: 8,
  },
  timeSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    marginTop: 8,
  },
  timeSlotBox: {
    marginRight: 8,
    marginBottom: 8,
    width: "18%",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Neutrals100,
    alignItems: "center",
  },
  disabledSlotsBox: {
    borderColor: colors.Neutrals100,
  },
  disabledSlotsText: {
    color: colors.Neutrals200,
  },
  textArea: {
    backgroundColor: colors.BaseWhite,
    fontFamily: fonts.regular,
    borderColor: colors.Primary100,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: 16,
    textAlignVertical: "top",
    height: 80,
  },
});

export default BookAppointment;
