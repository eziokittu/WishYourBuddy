import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';
import ErrorPage from './ErrorPage';
import AdminCustomizeColour from '../PageComponents/AdminCustomizeColour';
import UpdateUserInfo from '../PageComponents/UpdateUserInfo';

const SettingsPage = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Header />
      {auth.token ? (
        <div className='bg-slate-800 text-gray-300 min-h-screen flex mt-8'>
          {auth.isAdmin ? (
            <div className='w-full'>
              <AdminCustomizeColour auth={auth} />
            </div>
          ) : (
            <UpdateUserInfo auth={auth} />
          )}
        </div>
      ) : (
        <ErrorPage isInsideAPage={true} message="You need to login to update the settings!" />
      )}
    </>
  )
}

export default SettingsPage