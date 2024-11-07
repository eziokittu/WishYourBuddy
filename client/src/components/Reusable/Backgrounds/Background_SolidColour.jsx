import React from 'react'

const Background_SolidColour = ({colour, children}) => {
  return (
    <div className={`fixed w-full h-full top-0 z-0 ${colour ? `bg-${colour}` : 'bg-stone-950'}`}>
      {children}
    </div>
  )
}

export default Background_SolidColour