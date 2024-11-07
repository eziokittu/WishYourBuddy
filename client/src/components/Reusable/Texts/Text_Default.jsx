import React from 'react'

const Text_Default = ({myId, myKey, colour, content}) => {
  return (
    <div
      key={myKey}
      id={myId}
      className={`text-xl text-center ${colour ? `text-${colour}` : 'text-black'} `}
    >
      <p>{content}</p>
    </div>
  )
}

export default Text_Default