import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';
import ErrorPage from './ErrorPage';
import AdminCustomizeColour from '../PageComponents/AdminCustomizeColour';

const SettingsPage = () => {
  const auth = useContext(AuthContext);
  const [inputEmail, setInputEmail] = useState(auth.email);
  const [inputPassword, setInputPassword] = useState('-');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('-');
  const [inputUsername, setInputUsername] = useState(auth.userName);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      setInputEmail(auth.email);
      setInputUsername(auth.userName);
    }
  }, [auth]);

  // function to check for invalid inputs and return the list of error message strings
  const validateInput = () => {
    let alerts = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail.trim() || !emailRegex.test(inputEmail)) {
      alerts.push('Enter a valid email');
    }

    const usernameRegex = /^[a-zA-Z0-9-]{4,36}$/;
    if (!inputUsername.trim() || !usernameRegex.test(inputUsername)) {
      alerts.push(`Enter a valid username (between 4-36 letters, only alphanumeric and '-' allowed)`);
    }

    // Password validation
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    // if (!inputPassword.trim() || !passwordRegex.test(inputPassword)) {
    if (!inputPassword.trim() || inputPassword.length < 6 && inputPassword !== '-') {
      alerts.push('Enter a Valid password [min length 6] --');
    }

    if (inputConfirmPassword !== inputPassword) {
      alerts.push('The confirm password does not match! --');
    }

    return alerts; // Return the alerts array directly
  };

  const authUpdateUserInfo = async event => {
    event.preventDefault();

    // Checking for invalid input
    const validationAlerts = validateInput()
    if (validationAlerts.length > 0) {
      alert(`Please correct the following input errors:\n- ${validationAlerts.join('\n- ')}`);
      return;
    }

    try {
      // console.log(inputEmail, inputPassword);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/patch/${auth.userId}`,
        'PATCH',
        JSON.stringify({
          userName: inputUsername,
          email: inputEmail,
          password: inputPassword
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      if (responseData.ok === 1) {
        await auth.updateInfo(
          responseData.userName,
          responseData.email,
        );
        console.log('User Info Update successful!');
        alert('User Info Update successful!');
      }
      else {
        console.log("Error Updating info!");
        alert("Error Updating info! - " + responseData.message);
      }
    } catch (err) {
      console.log('Error Updating info! --\n' + err);
    }
  };

  return (
    <>
      <Header />
      {auth.token ? (
        <div className='bg-slate-800 text-gray-300 min-h-screen flex mt-6'>
          {auth.isAdmin ? (
            <div className='w-full'>
              <AdminCustomizeColour token={auth.token} />
            </div>
          ) : (
            <div className='flex flex-col text-center mx-auto'>
              <p className='my-8 text-2xl underline underline-offset-8'>Update User Info</p>
              <form
                className='flex flex-col gap-2 border w-fit h-fit mx-auto p-8'
                onSubmit={authUpdateUserInfo}
              >
                {/* Username */}
                <div className='flex flex-col mx-auto'>
                  <label for="username" className="w-fit">Update Username</label>
                  <input
                    onChange={(event) => setInputUsername(event.target.value)}
                    type="text"
                    name="username"
                    id="username"
                    className="w-80 text-black"
                    placeholder="UserName"
                    defaultValue={auth.userName}
                    required=""
                  />
                </div>

                {/* Email */}
                <div className='flex flex-col mx-auto'>
                  <label for="email" className="w-fit">Update Email</label>
                  <input
                    onChange={(event) => setInputEmail(event.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="w-80 text-black"
                    placeholder="E-mail"
                    defaultValue={auth.email}
                    required=""
                  />
                </div>

                {/* Password */}
                <div className='flex flex-col mx-auto'>
                  <label for="password" className="w-fit">Update Password</label>
                  <input
                    onChange={(event) => setInputPassword(event.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="(unchanged)"
                    className="w-80 text-black"
                    required=""
                  />
                </div>

                {/* Confirm Password */}
                <div className='flex flex-col mx-auto'>
                  <label for="confirmPassword" className="w-fit">Confirm Updated Password</label>
                  <input
                    onChange={(event) => setInputConfirmPassword(event.target.value)}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="(unchanged)"
                    className="w-80 text-black"
                    required=""
                  />
                </div>

                <button className='hover:underline underline-offset-2' type='submit'>UPDATE</button>

              </form>
            </div>
          )}
        </div>
      ) : (
        <ErrorPage isInsideAPage={true} message="You need to login to update the settings!" />
      )}
    </>
  )
}

export default SettingsPage