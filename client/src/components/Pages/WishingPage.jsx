import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';

const WishingPage = ({pageSettings}) => {
  const auth = useContext(AuthContext);
  const { username, pagename } = useParams();
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  let existingUser;
  const getUser = async event => {
    try {
      // console.log(inputEmail, inputPassword);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/get/${username}`
      );
      if (responseData.ok === 1) {
        console.log('Username is valid');
      }
      else {
        console.log("Something went wrong! - "+responseData.message);
        alert("Something went wrong! - "+responseData.message);
        setTimeout(() => {
          // window.location.reload(false);
          navigate('/login')
        }, 1000);
      }
    } catch (err) {
      console.log('ERROR signing in! --\n' + err);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <div className='bg-slate-800 text-gray-300 h-screen flex'>
      <p className='text-center justify-center m-auto text-6xl'>Wishing Page</p>
    </div>
  )
}

export default WishingPage