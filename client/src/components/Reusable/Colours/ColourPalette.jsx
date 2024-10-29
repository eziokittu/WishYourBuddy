import React, { useState } from 'react';
import "../../../data/definedColours";

const ColourPalette = ({ heading, colours }) => {
  const [selectedColour, setSelectedColour] = useState('white');

  return (
    <div className='flex flex-col items-center border-2'>

      {/* Heading */}
      <div>
        <p className='text-xl border-b-2  vorder-white px-4 py-2 rounded-full'>{heading}</p>
      </div>

      {/* Grid of all colours */}
      <div className="grid grid-cols-10 gap-0 p-4 w-fit">
        {colours.map((colour) => {
          if (colour.name !== "white" && colour.name !== "black") {
            return (
              // <div
              //   key={colour.name}
              //   className={`flex items-center p-4 border rounded-md shadow-md bg-slate-900 `}
              // >
              //   <div className={`w-12 h-12 border rounded-full bg-${colour.name}`} />
              //   <div className="ml-4 flex flex-col items-center">
              //     <p className="text-lg font-semibold text-slate-200">{colour.name}</p>
              //   </div>
              // </div>
              <div 
                className={`bg-${colour.name}
                w-6 h-6 hover:scale-[2] cursor-pointer
                border border-black hover:border-black hover:rounded-full`}
                onClick={() => setSelectedColour(colour.name)}
              ></div>
            );
          }
        })}
        <div 
          className={`bg-white
          w-6 h-6 hover:scale-[2] cursor-pointer
          border border-black hover:border-black hover:rounded-full`}
          onClick={() => setSelectedColour('white')}
        ></div>
        <div 
          className={`bg-black
          w-6 h-6 hover:scale-[2] cursor-pointer
          border border-black hover:border-black hover:rounded-full`}
          onClick={() => setSelectedColour('black')}
        ></div>
      </div>

      {/* Selected Colour */}
      <div className='flex flex-row w-full px-4 mb-4 items-center justify-between'>
        <p>Selected:</p>
        <div className={`w-12 h-12 bg-${selectedColour}`}></div>
        <p className='text-xl'>{selectedColour}</p>
      </div>

    </div>
  )
}

export default ColourPalette