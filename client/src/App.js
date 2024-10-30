import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "./components/Backend/context/auth-context";
import { useAuth } from "./components/Backend/hooks/auth-hook";

import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import DemoPage from './components/Pages/DemoPage';
import ErrorPage from './components/Pages/ErrorPage';
import CreatePage from './components/Pages/CreatePage';
import SettingsPage from './components/Pages/SettingsPage';
import WishingPage from './components/Pages/WishingPage';

const App = () => {
  const {
    token,
    userId,
    isPaid,
    isAdmin,
    userName,
    email,

    login,
    logout,
    updateInfo
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        isAdmin: isAdmin,
        isPaid: isPaid,
        email: email,

        login: login,
        logout: logout,
        updateInfo: updateInfo
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/demo" element={<DemoPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route exact path="/create" element={<CreatePage />} />
          <Route exact path="/:username/:pagename" element={<WishingPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
