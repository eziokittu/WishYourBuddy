import React from 'react';

const coloursToBeUsed = [
  "bg-red-900",
  "bg-green-900",
  "bg-blue-900",
];

const PageElement = ({ menuOption, content, colour, children }) => {

  // Backgrounds
  if (menuOption === 1) {
    return (
      <div className={` w-screen h-fit ${colour ? `bg-${colour}-900` : 'bg-stone-950'} p-4`}>
        {children}
      </div>
    );
  } 
  
  // Texts
  else if (menuOption === 2) {
    return (
      <div className="text-justify bg-stone-900 text-white p-4 rounded-2xl border-2 border-stone-600">
        <p>{content}</p>
      </div>
    );
  } 
  
  // Image Gallerys
  else if (menuOption === 3) {
    return (
      <div className="text-justify bg-stone-900 text-white p-4 rounded-2xl border-2 border-stone-600">
        {content ? (
          <img src={content} alt="content" />
        ) : (
          <img src="https://picsum.photos/200/300" alt="placeholder" />
        )}
      </div>
    );
  }

  // Music
  else if (menuOption === 4) {
    return (
      <div>Component Not Made !</div>
    );
  }
};

export default PageElement;