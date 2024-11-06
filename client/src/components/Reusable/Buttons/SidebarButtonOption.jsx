import React from 'react'

const SidebarButtonOption = ({ title, key, chooseOption, optionValue }) => {
  return (
    <div
      key={key}
      className='flex flex-row justify-between items-center text-center bg-slate-900 text-slate-200 rounded-3xl py-2 pl-4 pr-2'
    >
      <button className='text-lg'>{title}</button>
      <button
        className='group'
        onClick={() => {
          chooseOption(optionValue);
        }}
      >
        <div className='font-bold rounded-full bg-slate-200 group-hover:bg-green-500 text-slate-950 p-2 group-hover:p-1 transition-all duration-300'>
          <svg className='w-4 group-hover:w-6 h-4 group-hover:h-6 transition-all duration-300' viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z" fill="currentColor"></path>
          </svg>
        </div>
      </button>
    </div>
  )
}

export default SidebarButtonOption