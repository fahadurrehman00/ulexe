import React, { useState } from "react";
import BookingTabs from "../../components/BookingTabs";
import UpComingBooking from "./UpComingBookings";
import CompletedBookings from "./CompletedBookings";
import CancelledBooking from "./CancelledBooking";

const BookingsScreen = ({ status }) => {
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const lowercaseStatus = status ? String(status).toLowerCase() : "";

  return (
    <>
      <BookingTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "Upcoming" && (
        <UpComingBooking status={lowercaseStatus} />
      )}
      {selectedTab === "Completed" && (
        <CompletedBookings status={lowercaseStatus} />
      )}
      {selectedTab === "Cancelled" && (
        <CancelledBooking status={lowercaseStatus} />
      )}
    </>
  );
};

export default BookingsScreen;
