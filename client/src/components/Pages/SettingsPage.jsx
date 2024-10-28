import React, { useState, useEffect, useContext } from 'react';
import Header from '../PageComponents/Header';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import ErrorPage from './ErrorPage';

const SettingsPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  return (
    <>
      <Header />
      {auth.token ? (
      <div className='bg-slate-800 text-gray-300 h-screen flex mt-6'>
        <p>Settings Page for user details, page colours ...</p>
      </div>
      ) : (
        <ErrorPage isInsideAPage={true} message="You need to login to update the settings!"/>
      )}
    </>
  )
}

export default SettingsPage