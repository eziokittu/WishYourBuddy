import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';

const Login = () => {
  const auth = useContext(AuthContext);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
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
      console.log(inputEmail, inputPassword);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
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
        responseData.userName,
        responseData.token,
        responseData.isAdmin,
        responseData.isPaid,
        responseData.email,
        false
      );
      console.log('Login successful!');
      if (responseData.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      console.log('ERROR signing in! --\n'+err);
    }
  };

  return (
    <div>
      <Header/>
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

        <button type='submit'>LOGIN</button>
        <button>Forgot Password?</button>
        <button>
          <Link to={"/signin"}>Signin Instead?</Link>
        </button>

      </form>
    </div>
  )
}

export default Login