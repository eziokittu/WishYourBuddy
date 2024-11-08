import React from 'react';
import { useNavigate } from 'react-router';

const CustomButton1 = ({name, isSubmit, link, navLink, colour, extraClasses}) => {
  const navigate = useNavigate();

  return (
    <button
      className={`group ${extraClasses}`}
      type={isSubmit ? 'submit' : 'button'}
      onClick={() => {
        if (navLink) navigate(navLink);
        if (link) {
          link();
        }
      }}
    >
      <div className={`font-bold rounded-3xl px-2 xsm:px-4 py-1 xsm:py-2 text-white transition-all duration-300
        ${colour === 'red' ? 'bg-mybtn-red-basic group-hover:bg-mybtn-red-dark group-hover:text-mybtn-red-light' : ''}
        ${colour === 'green' ? 'bg-mybtn-green-basic group-hover:bg-mybtn-green-dark group-hover:text-mybtn-green-light' : ''}
        ${colour === 'gray' ? 'bg-mybtn-gray-basic group-hover:bg-mybtn-gray-dark group-hover:text-mybtn-gray-light' : ''}
      `}>
        <p className=''>{name}</p>
      </div>
    </button>
  )
}

export default CustomButton1