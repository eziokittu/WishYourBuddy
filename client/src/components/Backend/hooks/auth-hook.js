import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const login = useCallback((
      uid, 
      token,  
      isAdmin, 
      isPaid, 
      userName, 
      email, 
      expirationDate
    ) => {
    setToken(token);
    setIsAdmin(isAdmin);
    setIsPaid(isPaid);
    setUserId(uid);
    setUserName(userName);
    setEmail(email);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2); // 2 days
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        isAdmin: isAdmin,
        isPaid: isPaid,

        userName: userName,
        email: email,

        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setIsAdmin(false);
    setIsPaid(false);
    setUserName(null);
    setEmail(null);
    localStorage.removeItem('userData');
  }, []);

  const updateUser = useCallback((_userName, _email) => {
    // Update state variables
    setUserName(_userName);
    setEmail(_email);
  
    // Update localStorage
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...storedData,
          userName: _userName,
          email: _email,
        })
      );
    }
  }, []);  

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId, 
        storedData.token, 
        storedData.isAdmin, 
        storedData.isPaid, 
        storedData.userName, 
        storedData.email, 
        new Date(storedData.expiration));
    }
  }, [login]);

  return { 
    token, 
    userId, 
    email,
    isAdmin,
    isPaid,
    userName,
    login, 
    logout, 
    updateUser
  };
};