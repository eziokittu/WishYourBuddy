import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';

const Signin = () => {
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
        `${process.env.REACT_APP_BACKEND_URL}/users/signin`,
        'POST',
        JSON.stringify({
          email: inputEmail,
          password: inputPassword
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(
        responseData.userId,
        responseData.token,
        responseData.isAdmin,
        responseData.isPaid,
        responseData.userName,
        responseData.email,
        false
      );
      console.log('Sign in successful!');
      if (responseData.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      console.log('ERROR signing in!');
    }
  };

  return (
    <div>
      <Header />
      <p className='text-center'>Login Page</p>
      <form
        className='flex flex-col border w-fit mx-auto p-8'
        onSubmit={authSubmitHandler}
      >

        {/* Email */}
        <div className='flex flex-col mx-auto'>
          <label for="email" className="w-fit">Your email</label>
          <input
            onChange={(event) => setInputEmail(event.target.value)}
            type="email"
            name="email"
            id="email"
            className="w-60"
            placeholder="E-mail"
            required=""
          />
        </div>

        {/* Password */}
        <div className='flex flex-col mx-auto'>
          <label for="password" className="w-fit">Password</label>
          <input
            onChange={(event) => setInputPassword(event.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-60"
            required=""
          />
        </div>

        {/* Confirm Password */}
        <div className='flex flex-col mx-auto'>
          <label for="confirm-password" className="w-fit">Confirm password</label>
          <input
            onChange={(event) => setInputConfirmPassword(event.target.value)}
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
            className="w-60"
            required=""
          />
        </div>

        <button type='submit'>SIGNIN</button>
        <button>
          <Link to={"/login"}>Login Instead?</Link>
        </button>

      </form>
    </div>
  )
}

export default Signin