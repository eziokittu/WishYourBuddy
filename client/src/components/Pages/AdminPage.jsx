import React, { useState, useEffect, useContext } from 'react';
import Header from '../PageComponents/Header';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import ErrorPage from './ErrorPage';

const AdminPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  return (
    <div>
      <Header />
      {auth.isAdmin ? (
        <div className='bg-slate-800 text-gray-300 h-screen flex'>
          <p className='text-center justify-center m-auto text-6xl'>ADMIN Page - {auth.email.split('@')[0]}</p>
        </div>
      ) : (
        <ErrorPage isInsideAPage={true} message="You are not authorized to view this page"/>
      )}
    </div>
  )
}

export default AdminPage