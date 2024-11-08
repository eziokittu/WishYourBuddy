import React from 'react'

const TextDefault = ({myId, myKey, colour, content}) => {
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

export default TextDefault