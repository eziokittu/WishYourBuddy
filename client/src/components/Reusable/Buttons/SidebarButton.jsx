import React from 'react';

const SidebarButton = ({ menuOptionNumber, optionDataDefault, optionDataOption, setMenuOption, chooseOption, menuOption }) => {
  return (
    <>
      {menuOption !== menuOptionNumber ? (
        <div
          onClick={() => {
            setMenuOption(optionDataOption.menu_option)
            chooseOption(0);
          }}
          className='flex flex-row justify-between items-center cursor-pointer'
        >
          <p className='text-xl'>{optionDataOption.menu_name} </p>
          <button
            aria-label="Show options"
            className='flex items-center'
          >
            <svg className='w-6 h-6' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            setMenuOption(optionDataDefault.menu_option)
          }}
          className='flex flex-row justify-between items-center cursor-pointer'
        >
          <p className='text-xl'>{optionDataOption.menu_name} </p>
          <button
            aria-label="Hide options"
            className='flex items-center'
          >
            <svg className='w-6 h-6' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

export default SidebarButton