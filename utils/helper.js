import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to check if the user is an admin
export const isAdmin = async () => {
  try {
    const role = await AsyncStorage.getItem("role");
    if (role === "business_owner") {
      return true;
    } else if (role === "staff") {
      return await false;
    } else {
      console.error("Error fetching user role, invalid role value");
      return false; // Return false or handle invalid role cases
    }
  } catch (error) {
    console.error("Error fetching user role, logging out", error);
    return false; // Fallback in case of error
  }
};

// Function to get the logged-in user's ID
export const getLoginUser = async () => {
  try {
    const id = await AsyncStorage.getItem("userId");
    
    // Check if the ID is null or undefined
    if (id !== null && id !== undefined) {
      return id;
    } else {
      console.error("No user ID found in storage");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user ID, logging out", error);
    return null; // Fallback in case of error
  }
};
