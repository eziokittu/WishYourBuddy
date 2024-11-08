import React from 'react';
import Header from '../PageComponents/Header';
import CustomButton1 from '../Reusable/Buttons/CustomButton1';

const ErrorPage = ({ message, isInsideAPage }) => {
  return (
    <div>
      {!isInsideAPage && (<Header />)}
      <div className='mt-8 pt-24 bg-slate-800 text-white h-screen'>
        <div className='flex flex-col mx-auto w-fit gap-8 border bg-mybg-basic border-white px-2 xsm:px-8 py-8'>
          <p className='text-center text-4xl'>Page Not Found - 404</p>
          {!!message ? (
            <p className='text-center text-xl'>{message}</p>
          ) : (
            <p className='text-center text-xl'>The requested page does not exist!</p>
          )}

          <CustomButton1 name={"Return to Dashboard"} colour={'green'} navLink={'/'} />
          
        </div>
      </div>
    </div>
  )
}

export default ErrorPage