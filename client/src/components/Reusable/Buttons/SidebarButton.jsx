import React, { useState } from 'react';

const SidebarButton = ({ section, names, links }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <div className='border-b border-slate-200 px-2 flex flex-col'>

      <div className='flex flex-row justify-between items-center'>
        <p className='text-xl'>{section}</p>
        {!optionsVisible ? (
          <button 
            aria-label="Show options" 
            className='flex items-center' 
            onClick={toggleOptions}
          >
            <svg className='w-6 h-6' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
            </svg>
          </button>
        ) : (
          <button 
            aria-label="Hide options" 
            className='flex items-center' 
            onClick={toggleOptions}
          >
            <svg className='w-6 h-6' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="currentColor"></path>
            </svg>
          </button>
        )}
      </div>

      {optionsVisible && (
        <div className='flex flex-col gap-2 my-2 ml-2'>
          {names.map((name, index) => (
            <div 
              key={index} 
              className='flex flex-row justify-between items-center text-center bg-slate-800 text-slate-200 rounded-3xl py-2 pl-4 pr-2'
            >
              <button className='text-lg'>{name}</button>
              <button 
                className='group' 
                onClick={()=>console.log("Button clicked!")}
              >
                <div className='font-bold rounded-full bg-slate-200 group-hover:bg-green-500 text-slate-950 p-2 group-hover:p-1 transition-all duration-300'>
                  <svg className='w-4 group-hover:w-6 h-4 group-hover:h-6 transition-all duration-300' viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarButton;
