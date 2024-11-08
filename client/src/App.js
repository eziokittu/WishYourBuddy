import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "./components/Backend/context/auth-context";
import { PageContext } from "./components/Backend/context/page-context"; // Import PageContext
import { useAuth } from "./components/Backend/hooks/auth-hook";
import { usePage } from "./components/Backend/hooks/page-hook"; // Import usePage hook

import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import DemoPage from './components/Pages/DemoPage';
import ErrorPage from './components/Pages/ErrorPage';
import CreatePage from './components/Pages/CreatePage';
import SettingsPage from './components/Pages/SettingsPage';
import WishingPage from './components/Pages/WishingPage';

const App = () => {
  // Authentication state and methods
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

  const {
    pages,
    savePage,
    deletePage,
    updatePage,
    loadPage
  } = usePage();

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
      <PageContext.Provider
        value={{
          pages: pages,
          savePage: savePage,
          deletePage: deletePage,
          updatePage: updatePage,
          loadPage: loadPage,
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
      </PageContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
