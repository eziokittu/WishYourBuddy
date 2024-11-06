import React, { useEffect } from 'react';
import PageElement from "./PageElement";

const PreviewArea = (menuOption, optionChosen) => {
  useEffect(() => {
    console.log(menuOption, " ", optionChosen);
  }, [menuOption, optionChosen])

  return (
    <div className='flex flex-col items-center gap-2 xsm:gap-4 border border-white m-2 xsm:m-4'>
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