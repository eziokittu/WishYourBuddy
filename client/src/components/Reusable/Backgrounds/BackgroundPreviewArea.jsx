import React, { useState } from 'react';
import ColourPalette from '../Colours/ColourPalette';
import "../../../data/definedColours";
import optionData from '../../../data/optionData.json';
import CustomButton1 from '../Buttons/CustomButton1';

const BackgroundPreviewArea = ({ optionChosen, setInputBackgroundColour, updateBackgroundElement }) => {
  const [chosenColour, setChosenColour] = useState('transparent');

  // Callback to choose colour from the colour palette
  const chooseColour = (selectedColour) => {
    setInputBackgroundColour(() => { return selectedColour });
    setChosenColour(() => { return selectedColour });
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
      {optionChosen === 0 && (
        <div className={`w-[200px] h-[200px] bg-${chosenColour} border border-white`} />
      )}
      {optionChosen === 1 && (
        <p className={` text-center text-${chosenColour} text-3xl`} >Snowfall Colour</p>
      )}

      {/* Select Colour */}
      <ColourPalette heading={"Choose Colour"} chooseColour={chooseColour} />

      {/* Add component to page */}
      <CustomButton1 colour={'green'} link={updateBackgroundElement} name={'Update Background'} />
    </div>
  )
}

export default BackgroundPreviewArea