import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';
import CustomButton1 from "../Reusable/Buttons/CustomButton1";

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
      // console.log(inputEmail, inputPassword);
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
      if (responseData.ok === 1) {
        await auth.login(
          responseData.userId,
          responseData.token,
          responseData.isAdmin,
          responseData.isPaid,
          responseData.userName,
          responseData.email,
          false
        );
        console.log('Login successful!');
        navigate('/');
      }
      else {
        console.log("ERROR signing in!");
        alert("Error logging in! - "+responseData.message);
      }
    } catch (err) {
      console.log('ERROR signing in! --\n' + err);
    }
  };

  return (
    <div>
      <Header />
      <div className='mt-8 pt-24 bg-mybg-light text-white h-screen flex flex-col'>
        <p className='text-center text-4xl pb-8'>Login Page</p>
        <form
          className='flex flex-col gap-2 rounded-2xl bg-mybg-basic border w-fit h-fit mx-auto p-8'
          onSubmit={authSubmitHandler}
        >

          {/* Email */}
          <div className='flex flex-col mx-auto'>
            <label for="email" className="w-fit">Email</label>
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
            <label for="password" className="w-fit">Password</label>
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

          <CustomButton1 extraClasses={`mb-12 mt-4`} isSubmit={true} name={"LOGIN"} colour={"green"} />
          <CustomButton1 link={()=>(console.log("Forgot Passowrd Functionality not made yet!"))} name={"Forgot Passord"} colour={"red"} />
          <CustomButton1 navLink={"/signup"} name={"Signup Instead?"} colour={"gray"} />

        </form>
      </div>
    </div>
  )
}

export default Login