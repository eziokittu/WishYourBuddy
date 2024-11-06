import React, { useContext, useState } from 'react';
import { AuthContext } from '../Backend/context/auth-context';
import CustomButton1 from '../Reusable/Buttons/CustomButton1';
import BackgroundPreviewArea from '../Reusable/Backgrounds/BackgroundPreviewArea';
import TextPreviewArea from '../Reusable/Texts/TextPreviewArea';
import MusicPreviewArea from '../Reusable/Music/MusicPreviewArea';
import ImageGalleryPreviewArea from '../Reusable/ImageGalleries/ImageGalleryPreviewArea';
import PreviewArea from '../Reusable/PreviewArea';

const PreviewPage = ({ menuOption }) => {
  const auth = useContext(AuthContext);
  const [pageName, setPageName] = useState("page1");

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      {/* Heading */}
      <div className='text-center mt-8'>
        <p className='text-2xl underline underline-offset-8'>Preview your page</p>
      </div>

      {/* Component Preview Areas */}
      <div>
        {/* Background Preview Area */}
        {menuOption === 1 && (
          <BackgroundPreviewArea />
        )}

        {/* Background Preview Area */}
        {menuOption === 2 && (
          <TextPreviewArea />
        )}

        {/* Background Preview Area */}
        {menuOption === 3 && (
          <ImageGalleryPreviewArea />
        )}

        {/* Background Preview Area */}
        {menuOption === 4 && (
          <MusicPreviewArea />
        )}
      </div>

      {/* Page Preview Area */}
      <div className='mx-4 w-full'>
        <PreviewArea />
      </div>

      {/* Create and view Page */}
      {/* <div className='flex flex-row mx-auto items-center justify-center border-2 rounded-full px-4 py-4'>

        <div className='flex flex-row text-center items-center gap-2 mr-12'>
          <label for="pagename" className="w-fit">Enter Page Name</label>
          <input
            onChange={(event) => setPageName(event.target.value)}
            type="text"
            name="pagename"
            id="pagename"
            className="w-40 text-black px-4 py-2 rounded-3xl"
            placeholder="Enter page name"
            defaultValue={pageName}
            required=""
          />
        </div>

        <CustomButton1 name={`Create and View Page`} link={() => { window.open(`/${auth.userName}/${pageName}`, '_blank') }} />
      </div> */}
    </div>
  )
}

export default PreviewPage