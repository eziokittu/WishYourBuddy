import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';
import CustomButton1 from '../Reusable/Buttons/CustomButton1';

const Signup = () => {
  const auth = useContext(AuthContext);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  // function to check for invalid inputs and return the list of error message strings
  const validateInput = () => {
    let alerts = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail.trim() || !emailRegex.test(inputEmail)) {
      alerts.push('Enter a valid email');
    }

    // Password validation
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    // if (!inputPassword.trim() || !passwordRegex.test(inputPassword)) {
    if (!inputPassword.trim() || inputPassword.length < 6) {
      alerts.push('Enter a Valid password [min length 6] --');
    }

    if (inputConfirmPassword !== inputPassword) {
      alerts.push("Password does not match with confirm password!");
    }

    return alerts; // Return the alerts array directly
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    // Checking for invalid input
    const validationAlerts = validateInput()
    if (validationAlerts.length > 0) {
      alert(`Please correct the following input errors:\n- ${validationAlerts.join('\n- ')}`);
      return;
    }

    try {
      // console.log(inputEmail, inputPassword, inputFirstname, inputLastname);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        'POST',
        JSON.stringify({
          email: inputEmail,
          password: inputPassword
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      if (responseData.ok === 1) {
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.isAdmin,
          responseData.isPaid,
          responseData.userName,
          responseData.email,
          false
        );
        console.log('Signup successful!');
        navigate('/');
      }
      else {
        console.log('ERROR Signing in!');
        alert("Error signing in! - " + responseData.message);
      }
    } catch (err) {
      console.log('ERROR Signing in!');
    }
  };

  return (
    <div>
      <Header />
      <div className='mt-8 pt-24 bg-mybg-light text-white h-screen flex flex-col'>
        <p className='text-center text-4xl pb-8'>Signup Page</p>
        <form
          className='flex flex-col gap-2 border rounded-2xl bg-mybg-basic w-fit h-fit mx-auto p-8'
          onSubmit={authSubmitHandler}
        >

          {/* Email */}
          <div className='flex flex-col mx-auto'>
            <label htmlFor="email" className="w-fit">Email</label>
            <input
              onChange={(event) => setInputEmail(event.target.value)}
              type="email"
              name="email"
              id="email"
              className="w-60 xsm:w-80 px-4 py-2 rounded-full text-black"
              placeholder="E-mail"
              required=""
            />
          </div>

          {/* Password */}
          <div className='flex flex-col mx-auto'>
            <label htmlFor="password" className="w-fit">Password</label>
            <input
              onChange={(event) => setInputPassword(event.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-60 xsm:w-80 px-4 py-2 rounded-full text-black"
              required=""
            />
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col mx-auto'>
            <label htmlFor="confirm-password" className="w-fit">Confirm password</label>
            <input
              onChange={(event) => setInputConfirmPassword(event.target.value)}
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="w-60 xsm:w-80 px-4 py-2 rounded-full text-black"
              required=""
            />
          </div>

          <CustomButton1 extraClasses={`mt-4 mb-12`} isSubmit={true} name={"Signup"} colour={'green'} />
          <CustomButton1 navLink={'/login'} name={"Aready have an Account?"} colour={'gray'} />

        </form>
      </div>
    </div>
  )
}

export default Signup