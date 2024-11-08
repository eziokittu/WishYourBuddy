import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../Backend/hooks/http-hook';
import CustomButton1 from '../Reusable/Buttons/CustomButton1';

const UpdateUserInfo = ({auth}) => {
  const [inputEmail, setInputEmail] = useState(auth.email);
  const [inputPassword, setInputPassword] = useState('-');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('-');
  const [inputUsername, setInputUsername] = useState(auth.userName);
  const { sendRequest } = useHttpClient();

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

    if (!inputPassword.trim() || inputPassword.length < 6 && inputPassword !== '-') {
      alerts.push('Enter a Valid password [min length 6] --');
    }

    if (inputConfirmPassword !== inputPassword) {
      alerts.push('The confirm password does not match! --');
    }

    return alerts;
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
        setTimeout(() => {
          window.location.reload(false);
        }, 1000)
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
    <div className='flex flex-col text-center mx-auto'>
      <p className='my-8 text-2xl underline underline-offset-8'>Update User Info</p>
      <form
        className='flex flex-col bg-mybg-basic gap-2 border rounded-2xl border-white w-fit h-fit mx-auto p-2 xsm:p-8 gap:p-8'
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
            className="w-60 xsm:w-80 px-4 py-2 rounded-full text-black"
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
            className="w-60 xsm:w-80 px-4 py-2 rounded-full text-black"
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
            className="w-60 xsm:w-80 px-4 py-2 rounded-full text-black"
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
            className="w-60 xsm:w-80 px-4 py-2 rounded-full text-black"
            required=""
          />
        </div>

        <CustomButton1 extraClasses={`mt-16`} name={'UPDATE'} isSubmit={true} colour={'green'} />

      </form>
    </div>
  )
}

export default UpdateUserInfo