import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Backend/context/auth-context';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { v4 as uuidv4 } from 'uuid';

import BackgroundPreviewArea from '../Reusable/Backgrounds/BackgroundPreviewArea';
import TextPreviewArea from '../Reusable/Texts/TextPreviewArea';
import MusicPreviewArea from '../Reusable/Music/MusicPreviewArea';
import ImageGalleryPreviewArea from '../Reusable/ImageGalleries/ImageGalleryPreviewArea';
import PreviewArea from '../Reusable/PreviewArea';
import optionData from '../../data/optionData.json';

const PreviewPage = ({ menuOption, optionChosen }) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

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
        id: uuidv4(),
        colour: "white",
        content: ""
      }
    ])
  }, [optionData]);

  // function to add a text component
  const addTextElement = (event) => {
    event.preventDefault();

    const newPageElement = {
      type: optionData.texts.component,
      id: uuidv4(),
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
        ? { ...element, colour: inputBackgroundColour } // Update the existing background element
        : element
    );

    setPageElements(updatedPageElements);

    console.log("Background element updated with colour: " + inputBackgroundColour);
  };

  const [inputPageName, setInputPageName] = useState("");

  // Page Name Validation
  const validateInput = () => {
    let alerts = [];
    const pageNameRegex = /^[a-zA-Z][a-zA-Z0-9-]{0,35}$/;
    if (!inputPageName.trim() || !pageNameRegex.test(inputPageName)) {
      alerts.push(`Enter a valid page name (between 1-36 letters, only alphanumeric and '-' allowed, must start with a letter)`);
    }
    return alerts;
  };

  // Function that saves the page elements to the page database and links to the user and then navigates to the created page
  const createPage = async event => {
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
        `${process.env.REACT_APP_BACKEND_URL}/pages/post/${auth.userName}`,
        'POST',
        JSON.stringify({
          name: inputPageName,
          pageElements: pageElements
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      if (responseData.ok === 1) {
        console.log('Creating new Page successful!');

        // Navigate to the created page after 1 second
        setTimeout(() => {
          // window.location.reload(false);
          // navigate(`/${auth.userName}/${inputPageName}`);
          window.open(`/${auth.userName}/${inputPageName}`, '_blank')
        }, 1000);
      }
      else {
        console.log("Error Creating new Page!");
        alert("Error Creating new Page! - " + responseData.message);
      }
    } catch (err) {
      console.log('Error Creating new Page! --\n' + err);
    }
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
      <div className='w-full'>
        <PreviewArea pageElements={pageElements} />
      </div>

      {/* Create Page Form */}
      <div className='flex flex-row items-center h-16 xsm:h-20 gap-2 xsm:gap-4 p-2 xsm:p-4 border border-white '>

        {/* Page Name Input */}
        <div className='flex flex-col mx-auto items-center'>
          <label htmlFor="input-text" className="w-fit">Enter Page Name</label>
          <input
            onChange={(event) => setInputPageName(event.target.value)}
            type="text"
            name="input-text"
            id="input-text"
            className="w-36 xsm:w-48 text-black"
            placeholder="MyPage"
          />
        </div>

        {/* Create Page Button */}
        <button
          onClick={createPage}
          className='bg-green-700 hover:bg-green-800 text-white px-2 xsm:px-4 py-2 xsm:py-2 h-full'
        >Create Page</button>
      </div>
    </div>
  )
}

export default PreviewPage

// Authorization: 'Bearer ' + auth.token