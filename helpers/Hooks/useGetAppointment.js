import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

export default function useGetAppointment({ serviceId, date, clinicId }) {
  const [appointmentData, setAppointmentData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  function transformResponse(response) {
    const { data } = response;
    const professional = data.team.map((teamMember) => ({
      id: teamMember.team_member_id.toString(),
      name: teamMember.team_member_name,
      role: teamMember.role,
      img: teamMember.profile_image,
    }));

    const timeslots = data.timeslots.bookings.reduce((acc, booking) => {
      acc[booking.team_member_id] = {
        booking_date: data.timeslots.booking_date,
        clinic_is_open: data.timeslots.clinic_is_open,
        bookings: booking.time_slots.length.toString(),
        time_slots: booking.time_slots.map((slot) => ({
          booking_time: slot.booking_time,
          isDisabled: slot.is_disabled,
        })),
      };
      return acc;
    }, {});

    const calendar_dates = data.calendar_dates.map((date) => ({
      date: date.date,
      day: date.day,
      dayOfWeek: date.dayOfWeek,
      isSelected: date.isSelected,
      isDisabled: date.isDisabled,
    }));

    const structure = {
      previous_date: data.previous_date,
      next_date: data.next_date,
      month_and_year: data.month_and_year,
      professional,
      calendar_dates,
      timeslots: {
        ...timeslots,
      },
    };

    return structure;
  }
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        `/clinics/${clinicId}?with=timeslots&service_id=${serviceId}&date=${date}`,
        "GET",
        null,
        true,
        {},
        "token"
      );
      response.data.timeslots.bookings.forEach((timeslotGroup, index) => {});

      if (response.status) {
        const structure = transformResponse(response);
        setAppointmentData(structure);
      } else if (response?.status === "Error") {
        setError(response.msg);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [date]);
  return { loading, appointmentData, error };
}
