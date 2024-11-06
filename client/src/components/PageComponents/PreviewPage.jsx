import React from 'react';
import BackgroundPreviewArea from '../Reusable/Backgrounds/BackgroundPreviewArea';
import TextPreviewArea from '../Reusable/Texts/TextPreviewArea';
import MusicPreviewArea from '../Reusable/Music/MusicPreviewArea';
import ImageGalleryPreviewArea from '../Reusable/ImageGalleries/ImageGalleryPreviewArea';
import PreviewArea from '../Reusable/PreviewArea';

const PreviewPage = ({ menuOption, optionChosen }) => {
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
          <BackgroundPreviewArea optionChosen={optionChosen} />
        )}

        {/* Background Preview Area */}
        {menuOption === 2 && (
          <TextPreviewArea optionChosen={optionChosen} />
        )}

        {/* Background Preview Area */}
        {menuOption === 3 && (
          <ImageGalleryPreviewArea optionChosen={optionChosen} />
        )}

        {/* Background Preview Area */}
        {menuOption === 4 && (
          <MusicPreviewArea optionChosen={optionChosen} />
        )}
      </div>

      {/* Page Preview Area */}
      <div className='mx-4 w-full'>
        <PreviewArea menuOption={menuOption} optionChosen={optionChosen} />
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