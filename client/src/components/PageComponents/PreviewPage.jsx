import React, { useEffect, useState } from 'react';
import BackgroundPreviewArea from '../Reusable/Backgrounds/BackgroundPreviewArea';
import TextPreviewArea from '../Reusable/Texts/TextPreviewArea';
import MusicPreviewArea from '../Reusable/Music/MusicPreviewArea';
import ImageGalleryPreviewArea from '../Reusable/ImageGalleries/ImageGalleryPreviewArea';
import PreviewArea from '../Reusable/PreviewArea';
import optionData from '../../data/optionData.json';

const PreviewPage = ({ menuOption, optionChosen }) => {

  // All input states
  const [inputText, setInputText] = useState("");
  const [inputTextColour, setInputTextColour] = useState("");
  const [inputBackgroundColour, setInputBackgroundColour] = useState("");

  // The data of pageElements to be saved in server side
  const [pageElements, setPageElements] = useState([]);

  // Runs only 1 time
  useEffect(() => {
    setPageElements([
      {
        type: optionData.backgrounds.component,
        id: Date.now(),
        colour: "white",
        content: ""
      }
    ])
  }, [optionData]);

  useEffect(() => {
    console.log(pageElements)
  }, [pageElements]);

  // function to add a text component
  const addTextElement = (event) => {
    event.preventDefault();

    const newPageElement = {
      type: optionData.texts.component,
      id: Date.now(),
      content: inputText,
      colour: inputTextColour
    };
    setPageElements([...pageElements, newPageElement]);

    console.log("Text element added with text: " + inputText);
  };

  // function to update the existing background
  const updateBackgroundElement = (event) => {
    event.preventDefault();

    const updatedPageElements = pageElements.map((element) =>
      element.type === "background"
        ? { ...element, colour: inputBackgroundColour, id: Date.now() } // Update the existing background element
        : element
    );

    setPageElements(updatedPageElements);

    console.log("Background element updated with colour: " + inputBackgroundColour);
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      {/* Heading */}
      <div className='text-center mt-8'>
        <p className='text-2xl underline underline-offset-8'>Preview your page</p>
      </div>

      {/* Component Preview Areas */}
      <div>
        {/* Default Preview Area */}
        {menuOption === 0 && (
          <div
            className='flex flex-col items-center gap-4 border border-white p-2 xsm:p-4'
          >Select a component from the sidebar</div>
        )}

        {/* Background Preview Area */}
        {menuOption === 1 && (
          <BackgroundPreviewArea 
            optionChosen={optionChosen} 
            setInputBackgroundColour={setInputBackgroundColour}
            updateBackgroundElement={updateBackgroundElement}
          />
        )}

        {/* Text Preview Area */}
        {menuOption === 2 && (
          <TextPreviewArea 
            optionChosen={optionChosen} 
            inputText={inputText}
            setInputText={setInputText}
            setInputTextColour={setInputTextColour}
            addTextElement={addTextElement}
          />
        )}

        {/* Image Gallery Preview Area */}
        {menuOption === 3 && (
          <ImageGalleryPreviewArea 
            optionChosen={optionChosen} 
          />
        )}

        {/* Music Preview Area */}
        {menuOption === 4 && (
          <MusicPreviewArea 
            optionChosen={optionChosen} 
          />
        )}
      </div>

      {/* Page Preview Area */}
      <div className='mx-4 w-full'>
        <PreviewArea pageElements={pageElements} />
      </div>
    </div>
  )
}

export default PreviewPage