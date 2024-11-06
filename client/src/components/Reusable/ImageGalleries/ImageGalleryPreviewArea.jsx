import React from 'react'
import optionData from '../../../data/optionData.json';

const ImageGalleryPreviewArea = ({optionChosen}) => {
  return (
    <div className='flex flex-col items-center gap-4 border border-white p-4'>
      {/* Heading */}
      <div className='flex flex-col items-center justify-centertext-center'>
        <p className='underline underline-offset-4'>Image Gallery Preview Area</p>
        <p className='font-bold text-2xl'>"{optionData.gallerys.options[optionChosen]}"</p>
      </div>

    </div>
  )
}

export default ImageGalleryPreviewArea