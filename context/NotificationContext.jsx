import React, { createContext, useState, useEffect } from "react";
import { apiCall, getToken } from "../utils/api";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiCall(`/get/notifications`, "POST", true);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setNotifications(data.data || []);
      } catch (error) {}
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationsContext.Provider value={notifications}>
      {children}
    </NotificationsContext.Provider>
  );
};
