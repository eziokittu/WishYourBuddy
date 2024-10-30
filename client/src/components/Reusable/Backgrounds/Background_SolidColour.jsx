import React from 'react'

const Background_SolidColour = ({colour}) => {
  return (
    <div className={`fixed w-full h-full top-0 z-0 bg-${colour}`}></div>
  )
}

export default Background_SolidColour