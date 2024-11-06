import React from 'react'

const PreviewArea = () => {
  return (
    <div className='flex flex-col items-center gap-4 border border-white m-4'>
      {/* Heading */}
      <p>Page Preview</p>

      {/* Viewing Window */}
      <div className='w-full min-h-[300px] p-4 flex justify-center items-center'>
        preview content
      </div>
    </div>
  )
}

export default PreviewArea