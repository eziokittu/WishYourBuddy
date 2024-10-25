import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  isPaid: false,
  userId: null,
  token: null,
  email: "",
  userName: "",
  
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  // updateIsMobileOtpVerified: () => {}
});
