import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "./components/Backend/context/auth-context";
import { useAuth } from "./components/Backend/hooks/auth-hook";

import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import DemoPage from './components/Pages/DemoPage';
import ErrorPage from './components/Pages/ErrorPage';
import CreatePage from './components/Pages/CreatePage';
import AdminPage from './components/Pages/AdminPage';
import SettingsPage from './components/Pages/SettingsPage';

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
    updateUser
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
        updateUser: updateUser
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/demo" element={<DemoPage />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route exact path="/create" element={<CreatePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* Conditional rendering for authorized and unauthorized users */}
        {/* {token ? (
          <>
            {isAdmin && (
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/demo" element={<DemoPage />} />
                <Route exact path="/admin" element={<AdminPage />} />
                <Route exact path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            )}
            {!isAdmin && (
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/demo" element={<DemoPage />} />
                <Route exact path="/settings" element={<SettingsPage />} />
                <Route exact path="/create" element={<CreatePage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            )}
          </>
        ) : (
          // If not Authorized user
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/demo" element={<DemoPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )} */}
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
