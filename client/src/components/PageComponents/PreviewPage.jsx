import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router';
import { AuthContext } from '../Backend/context/auth-context';
import { PageContext } from '../Backend/context/page-context'; // Import PageContext
import { useHttpClient } from '../Backend/hooks/http-hook';
import { v4 as uuidv4 } from 'uuid';

import BackgroundPreviewArea from '../Reusable/Backgrounds/BackgroundPreviewArea';
import TextPreviewArea from '../Reusable/Texts/TextPreviewArea';
import MusicPreviewArea from '../Reusable/Music/MusicPreviewArea';
import ImageGalleryPreviewArea from '../Reusable/ImageGalleries/ImageGalleryPreviewArea';
import PreviewArea from '../Reusable/PageComponent/PreviewArea';
// import optionData from '../../data/optionData.json';
import CustomButton1 from '../Reusable/Buttons/CustomButton1';

const PreviewPage = ({ menuOption, optionChosen }) => {
  const auth = useContext(AuthContext);
  const { loadPage, savePage } = useContext(PageContext);
  const { sendRequest } = useHttpClient();
  // const navigate = useNavigate();

  // All input states
  const [inputText, setInputText] = useState("");
  const [inputTextColour, setInputTextColour] = useState("");
  const [inputBackgroundColour, setInputBackgroundColour] = useState("");

  // The data of pageElements to be saved in server side
  const [pageElements, setPageElements] = useState([]);
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

  useEffect(() => {
    // Load saved page elements on mount
    const loadedPageElements = loadPage();
    if (loadedPageElements.length > 0) {
      setPageElements(loadedPageElements);
    }
    else {
      // If no saved elements, initialize with a default element
      setPageElements([
        {
          type: 'background',
          id: uuidv4(),
          colour: "white",
          content: ""
        }
      ]);
    }
  }, [loadPage]);

  // Function to add a text component
  const addTextElement = () => {
    const newPageElement = {
      type: 'text',
      id: uuidv4(),
      content: inputText,
      colour: inputTextColour
    };
    const updatedPageElements = [...pageElements, newPageElement];
    setPageElements(updatedPageElements);
    savePage(updatedPageElements);
  };

  // Function to update the existing background
  const updateBackgroundElement = () => {
    const updatedPageElements = pageElements.map((element) =>
      element.type === "background"
        ? { ...element, colour: inputBackgroundColour }
        : element
    );
    setPageElements(updatedPageElements);
    savePage(updatedPageElements);
  };

  // Function that saves the page elements to the page database and links to the user and then navigates to the created page
  const createPage = async () => {
    const validationAlerts = validateInput();
    if (validationAlerts.length > 0) {
      alert(`Please correct the following input errors:\n- ${validationAlerts.join('\n- ')}`);
      return;
    }

    try {
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
          window.open(`/${auth.userName}/${inputPageName}`, '_blank');
        }, 1000);
      } else {
        console.log("Error Creating new Page!");
        alert("Error Creating new Page! - " + responseData.message);
      }
    } catch (err) {
      console.log('Error Creating new Page! --\n' + err);
    }
  };

  const resetPage = () => {
    // Reset state to initial background
    const initialPageElements = [
      {
        type: 'background',
        id: uuidv4(),
        colour: "white",
        content: ""
      }
    ];
    setPageElements(initialPageElements);

    // Save reset state to localStorage and context
    savePage(initialPageElements);
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      {/* Heading */}
      <div className='text-center mt-8'>
        <p className='text-2xl underline underline-offset-8'>Preview your page</p>
      </div>

      {/* Component Preview Areas */}
      <div className=''>
        {menuOption === 0 && (
          <div className='flex flex-col items-center gap-4 border bg-mybg-basic border-white rounded-2xl p-2 xsm:p-4'>
            Select a component from the sidebar
          </div>
        )}
        {menuOption === 1 && (
          <BackgroundPreviewArea
            optionChosen={optionChosen}
            setInputBackgroundColour={setInputBackgroundColour}
            updateBackgroundElement={updateBackgroundElement}
          />
        )}
        {menuOption === 2 && (
          <TextPreviewArea
            optionChosen={optionChosen}
            inputText={inputText}
            setInputText={setInputText}
            setInputTextColour={setInputTextColour}
            addTextElement={addTextElement}
          />
        )}
        {menuOption === 3 && <ImageGalleryPreviewArea optionChosen={optionChosen} />}
        {menuOption === 4 && <MusicPreviewArea optionChosen={optionChosen} />}
      </div>

      {/* Page Preview Area */}
      <div className='w-full'>
        <PreviewArea pageElements={pageElements} />
      </div>

      {/* Create Page Form */}
      <div className='bg-mybg-basic flex flex-col mx-2  items-center gap-4 p-2 xsm:p-4 border border-white rounded-2xl'>
        <div className='flex flex-row gap-2 xsm:gap-4'>
          {/* Page Name Input */}
          <input
            onChange={(event) => setInputPageName(event.target.value)}
            type="text"
            name="input-text"
            id="input-text"
            className="w-36 xsm:w-48 px-2 xsm:px-4 py-1 xsm:py-2 rounded-full text-black"
            placeholder="Enter Page Name"
          />

          {/* Create Page Button */}
          <CustomButton1 name={'Create Page'} link={() => createPage()} colour={'green'} />
        </div>

        {/* Page name View */}
        {inputPageName !== "" && (
          <div className='flex flex-col gap-1 text-center'>
            <p>Your page URL will be:</p>
            <p className='text-sm underline underline-offset-2'>
              <span>https://wish-your-buddy.vercel.app/</span>
              <span className='font-bold text-base'>{auth.userName}</span>
              <span>/</span>
              <span className='font-bold text-base'>{inputPageName}</span>
            </p>
            <p className='mt-8'>Note: Changing the username will change the URL as expected!</p>
          </div>
        )}
      </div>

      <div className='bg-mybg-basic flex flex-col mx-2 mb-2 items-center gap-4 p-2 xsm:p-4 border border-white rounded-2xl'>
        <p>Do you want to reset the page to default settings?</p>
        <CustomButton1 colour={'red'} name={"RESET Page"} link={resetPage} />
      </div>
    </div>
  );
};

export default PreviewPage;
