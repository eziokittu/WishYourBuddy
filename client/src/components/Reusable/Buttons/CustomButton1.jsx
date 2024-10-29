import React from 'react'

const CustomButton1 = ({name, link}) => {
  return (
    <button
      className='group'
      onClick={link}
    >
      <div className='font-bold rounded-3xl bg-slate-200 group-hover:bg-green-500 text-slate-950 p-2'>
        <p className=''>{name}</p>
      </div>
    </button>
  )
}

export default CustomButton1