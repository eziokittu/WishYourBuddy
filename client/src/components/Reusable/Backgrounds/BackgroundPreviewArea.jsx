import React, { useState } from 'react';
import ColourPalette from '../Colours/ColourPalette';
import "../../../data/definedColours";

const BackgroundPreviewArea = () => {
  const [chosenColour, setChosenColour] = useState('none');

  const chooseColour = (selectedColour) => {
    setChosenColour(selectedColour);
  }

  return (
    <div className='flex flex-col items-center gap-4 border border-white p-4'>
      {/* Heading */}
      <p>Background Preview Area</p>

      {/* Background */}
      <div className={`w-[200px] h-[200px] bg-${chosenColour} border border-white`} />

      {/* Select Colour */}
      <ColourPalette heading={"Choose Colour"} chooseColour={chooseColour} />
    </div>
  )
}

export default BackgroundPreviewArea