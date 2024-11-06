import React from 'react'
import optionData from '../../../data/optionData.json';

const MusicPreviewArea = ({optionChosen}) => {
  return (
    <div className='flex flex-col items-center gap-4 border border-white p-4'>
      {/* Heading */}
      <div className='flex flex-col items-center justify-centertext-center'>
        <p className='underline underline-offset-4'>Music Preview Area</p>
        <p className='font-bold text-2xl'>"{optionData.music.options[optionChosen]}"</p>
      </div>

    </div>
  )
}

export default MusicPreviewArea