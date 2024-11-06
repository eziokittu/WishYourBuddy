import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../Backend/hooks/http-hook';
import "../../../data/definedColours";

const ColourPalette = ({ heading, colours, deleteColour, isAdmin, chooseColour }) => {
  const [selectedColour, setSelectedColour] = useState('white');
  const [loadedColours, setLoadedColours] = useState([]);
  const { sendRequest } = useHttpClient();

  const getAllColours = async event => {
    // event.preventDefault();

    try {
      // console.log(inputEmail, inputPassword);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/colours/get/colour`,
      );
      if (responseData.ok === 1) {
        console.log('Fetching all colours successful!');
        setLoadedColours(responseData.colours);
      }
      else {
        console.log("Something went wrong! Could not fetch all colours! - " + responseData.message);
        alert("Something went wrong! Could not fetch all colours! - " + responseData.message);
      }
    } catch (err) {
      console.log('Something went wrong while fetching colours! - ' + err);
    }
  };

  // Runs one time
  useEffect(() => {
    getAllColours();
  }, [])

  return (
    <div className='flex flex-col items-center border-2 gap-1 xsm:gap-2'>

      {/* Heading */}
      <div>
        <p className='text-xl border-b-2  vorder-white px-4 py-2 rounded-full'>{heading}</p>
      </div>    
      
      {/* Grid of all colours */}
      {loadedColours ? (
      <div className="flex flex-col flex-wrap h-32 xsm:h-40">
        {loadedColours.map((colour) => {
          if (colour.name !== "white" && colour.name !== "black") {
            return (
              <div
                key={colour.name}
                className={`bg-${colour.name}
                w-3 h-3 xsm:w-4 xsm:h-4 hover:scale-[2] cursor-pointer
                border border-black hover:border-black hover:rounded-full`}
                onClick={
                  () => {
                    setSelectedColour(colour.name);
                    chooseColour(colour.name);
                  }
                }
              ></div>
            );
          }
        })}
        <div
          className={`bg-white
          w-3 h-3 xsm:w-4 xsm:h-4 hover:scale-[2] cursor-pointer
          border border-black hover:border-black hover:rounded-full`}
          onClick={() => setSelectedColour('white')}
        ></div>
        <div
          className={`bg-black
          w-3 h-3 xsm:w-4 xsm:h-4 hover:scale-[2] cursor-pointer
          border border-black hover:border-black hover:rounded-full`}
          onClick={() => setSelectedColour('black')}
        ></div>
      </div>
      ) : (
        <p className='text-center'>Loading available Colours / No colours available!</p>
      )}

      {/* Selected Colour */}
      <div className='flex flex-row w-full items-center justify-between'>
        <div className={`w-12 h-12 bg-${selectedColour} border border-white`}></div>
        <p className='text-lg'>{selectedColour}</p>

        {/* Delete the colour button */}
        {isAdmin && (
          <div onClick={() => { deleteColour(selectedColour) }} className=''>
            <svg className='w-10 h-10 text-red-500 hover:bg-white/10 p-1 rounded-3xl' fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.428 482.429" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path> <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path> <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path> <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"></path> </g> </g> </g></svg>
          </div>
        )}
      </div>

    </div>
  )
}

export default ColourPalette