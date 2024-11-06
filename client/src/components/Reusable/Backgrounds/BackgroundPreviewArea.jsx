import React, { useState } from 'react';
import ColourPalette from '../Colours/ColourPalette';
import "../../../data/definedColours";
import optionData from '../../../data/optionData.json';

const BackgroundPreviewArea = ({optionChosen}) => {
  const [chosenColour, setChosenColour] = useState('none');

  const chooseColour = (selectedColour) => {
    setChosenColour(selectedColour);
  }

  return (
    <div className='flex flex-col items-center gap-4 border border-white p-2 xsm:p-4'>
      {/* Heading */}
      <div className='flex flex-col items-center  justify-centertext-center'>
        <p className='underline underline-offset-4'>Background Preview Area</p>
        <p className='font-bold text-2xl'>"{optionData.backgrounds.options[optionChosen]}"</p>
      </div>

      {/* Selected Background */}
      <div className={`w-[200px] h-[200px] border border-white`}>
        
      </div>

      {/* Select Colour */}
      <ColourPalette heading={"Choose Colour"} chooseColour={chooseColour} />

      {/* Add component to page */}
      <button className='text-green-400'>Add Background</button>
    </div>
  )
}

export default BackgroundPreviewArea