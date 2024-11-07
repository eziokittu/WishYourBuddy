import React, { useState } from 'react';
import ColourPalette from '../Colours/ColourPalette';
import "../../../data/definedColours";
import optionData from '../../../data/optionData.json';

const BackgroundPreviewArea = ({optionChosen, inputBackgroundColour, setInputBackgroundColour, updateBackgroundElement}) => {
  const [chosenColour, setChosenColour] = useState('transparent');

  // Callback to choose colour from the colour palette
  const chooseColour = (selectedColour) => {
    setInputBackgroundColour(() => {return selectedColour});
    setChosenColour(() => {return selectedColour});
    // console.log("Colour Selected: "+selectedColour);
  }

  return (
    <div className='flex flex-col items-center gap-4 border border-white p-2 xsm:p-4'>
      {/* Heading */}
      <div className='flex flex-col items-center  justify-centertext-center'>
        <p className='underline underline-offset-4'>Background Preview Area</p>
        <p className='font-bold text-2xl'>"{optionData.backgrounds.options[optionChosen]}"</p>
      </div>

      {/* Selected Background */}
      <div className={`w-[200px] h-[200px] bg-${chosenColour} border border-white`} />

      {/* Select Colour */}
      <ColourPalette heading={"Choose Colour"} chooseColour={chooseColour} />

      {/* Add component to page */}
      <button 
        className='bg-green-800 hover:bg-green-700 px-4 py-2 text-white'
        onClick={updateBackgroundElement}
      >Add Background</button>
    </div>
  )
}

export default BackgroundPreviewArea