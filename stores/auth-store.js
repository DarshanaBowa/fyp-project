import create from 'zustand';
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthStore = create(set => ({
  isLoggedIn: false,
  setIsLoggedIn: async (value) => {
    const checkLoggedIn = await AsyncStorage.getItem("IS_LOGGEDIN");
      const bool = checkLoggedIn == "true" ? true: false;
    set(state => ({ isLoggedIn: bool }))
  },
  loginUser: async (value) => {
    await AsyncStorage.setItem('IS_LOGGEDIN', "true");
  },
  logoutUser: async (value) => {
    await AsyncStorage.setItem('IS_LOGGEDIN', "false");
  }
}))
