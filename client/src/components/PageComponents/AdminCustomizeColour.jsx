import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../Backend/hooks/http-hook';
import ColourPalette from '../Reusable/Colours/ColourPalette';

const AdminCustomizeColour = ({auth}) => {
  const { sendRequest } = useHttpClient();
  const [inputColourName, setInputColourName] = useState('black');

  // function to check for invalid inputs and return the list of error message strings
  const validateInput = () => {
    let alerts = [];

    // Colour Name Validation
    const colourNameRegex = /^[a-zA-Z0-9-]{1,36}$/;
    if (!inputColourName.trim() || !colourNameRegex.test(inputColourName)) {
      alerts.push(`Enter a valid colour name (between 1-36 letters, only alphanumeric and '-' allowed)`);
    }

    return alerts;
  };

  const addColour = async event => {
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
        `${process.env.REACT_APP_BACKEND_URL}/colours/post/colour`,
        'POST',
        JSON.stringify({
          name: inputColourName
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      if (responseData.ok === 1) {
        console.log('Adding new Colour successful!');

        // Refresh page after 1.5 s
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }
      else {
        console.log("Error Adding new Colour!");
        alert("Error Adding new Colour! - " + responseData.message);
      }
    } catch (err) {
      console.log('Error Adding new Colour! --\n' + err);
    }
  };

  const deleteColour = async (colourToBeDeleted) => {
    try {
      // console.log(inputEmail, inputPassword);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/colours/delete/colour`,
        'DELETE',
        JSON.stringify({
          name: colourToBeDeleted
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      if (responseData.ok === 1) {
        console.log('Deleting Colour successful!');

        // Refresh page after 1.5 s
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }
      else {
        console.log("Error Deleting Colour!");
        alert("Error Deleting Colour! - " + responseData.message);
      }
    } catch (err) {
      console.log('Error Deleting Colour! --\n' + err);
    }
  };

  return (
    <div className='flex flex-col items-center mx-auto w-full gap-4 my-4'>
      {/* Form to Add Colour */}
      <form
        className='flex flex-col gap-2 border w-fit h-fit mx-auto p-8'
        onSubmit={addColour}
      >
        {/* Colour Name */}
        <div className='flex flex-col mx-auto'>
          <label for="colourName" className="w-fit">Colour Name</label>
          <input
            onChange={(event) => setInputColourName(event.target.value)}
            type="text"
            name="colourName"
            id="colourName"
            className="w-80 text-black"
            placeholder="UserName"
            defaultValue={'black'}
            required=""
          />
        </div>

        {/* Colour Code */}
        {/* <div className='flex flex-col mx-auto'>
          <label for="colourCode" className="w-fit">Colour Code</label>
          <input
            onChange={(event) => setInputColourCode(event.target.value)}
            type="text"
            name="colourCode"
            id="colourCode"
            className="w-80 text-black"
            placeholder="colour Code"
            defaultValue={"bg-black"}
            required=""
          />
        </div> */}

        {/* Add Colour Button */}
        <button className='hover:underline underline-offset-2' type='submit'>Add Colour</button>

      </form>

      {/* View all Colours and delete */}
      <ColourPalette heading={"Colour Palette"} deleteColour={deleteColour} isAdmin={auth.isAdmin} />
    </div>
  )
}

export default AdminCustomizeColour