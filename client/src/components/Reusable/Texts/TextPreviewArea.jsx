import React, { useState } from 'react'
import ColourPalette from '../Colours/ColourPalette';
import "../../../data/definedColours";
import optionData from '../../../data/optionData.json';
import CustomButton1 from '../Buttons/CustomButton1';

const TextPreviewArea = ({ optionChosen, inputText, setInputText, setInputTextColour, addTextElement }) => {
  const [chosenColour, setChosenColour] = useState('transparent');

  // Callback to choose colour from the colour palette
  const chooseColour = (selectedColour) => {
    setInputTextColour(() => { return selectedColour });
    setChosenColour(() => { return selectedColour });
  }

  return (
    <div className='flex flex-col items-center gap-4 border border-white p-4'>
      {/* Heading */}
      <div className='flex flex-col items-center justify-centertext-center'>
        <p className='underline underline-offset-4'>Text Preview Area</p>
        <p className='font-bold text-2xl'>"{optionData.texts.options[optionChosen]}"</p>
      </div>

      {/* Preview Text */}
      <div className={`text-lg text-${chosenColour} border border-white p-4`}>{inputText}</div>

      {/* Text Area */}
      <div className='flex flex-col mx-auto'>
        <label for="input-text" className="w-fit">Your Text</label>
        <textarea
          onChange={(event) => setInputText(event.target.value)}
          type="text"
          name="input-text"
          id="input-text"
          className="w-60 text-black"
          placeholder="Custom Text"
        />
      </div>

      {/* Select Colour */}
      <ColourPalette heading={"Choose Colour"} chooseColour={chooseColour} />

      {/* Add component to page */}
      <CustomButton1 name={"Add Text"} link={addTextElement} colour={'green'} />

    </div>
  )
}

export default TextPreviewArea