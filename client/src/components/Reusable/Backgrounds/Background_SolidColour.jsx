import React from 'react'

const Background_SolidColour = ({ myKey, myId, colour, children }) => {
  return (
    <div
      key={myKey}
      id={myId}
      className={` w-full min-h-[300px] ${colour ? `bg-${colour}` : 'bg-stone-950'} p-4`}
    >{children}</div>
  )
}

export default Background_SolidColour