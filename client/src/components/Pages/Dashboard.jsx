import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';

const Dashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <Header />
      <div className='mt-6 bg-slate-800 text-gray-300 h-screen'>
        <div className='flex flex-col'>
          <p>Dashboard Page</p>

          {auth.token && (
            <Link to={"/create"}><button className='hover:underline underline-offset-4'>Create a wishing page</button></Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard