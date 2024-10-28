import React from 'react';
import Header from '../PageComponents/Header';

const ErrorPage = ({ message, isInsideAPage }) => {
  return (
    <div>
      {!isInsideAPage && (<Header />)}
      <div className='mt-6 pt-24 bg-slate-800 text-gray-300 h-screen'>
        <div className='flex flex-col'>
          <p className='text-center text-4xl'>Page Not Found - 404</p>
          {!!message ? (
            <p className='text-center text-xl'>{message}</p>
          ) : (
            <p className='text-center text-xl'>The requested page does not exist!</p>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default ErrorPage