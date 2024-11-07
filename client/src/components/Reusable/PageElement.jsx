import React from 'react';
import "../../data/definedColours";
import Text_Default from './Texts/Text_Default';
import Background_SolidColour from './Backgrounds/Background_SolidColour';

const gg = [
  "bg-white"
]

const PageElement = ({ type, myKey, myId, content, colour, children }) => {

  // Backgrounds
  if (type === 'background') {
    return (
      <Background_SolidColour
        myId={myId}
        myKey={myKey}
        colour={colour}
        children={children}
      />
    )
  }

  // Texts
  else if (type === 'text') {
    return (
      <Text_Default 
        myId={myId}
        myKey={myKey}
        colour={colour}
        content={content}
      />
    );
  }

  // Image Gallerys
  // else if (menuOption === 3) {
  //   if (optionChosen === 0) {
  //     return (
  //       <div className="text-justify bg-stone-900 text-white p-4 rounded-2xl border-2 border-stone-600">
  //         {content ? (
  //           <img src={content} alt="content" />
  //         ) : (
  //           <img src="https://picsum.photos/200/300" alt="placeholder" />
  //         )}
  //       </div>
  //     );
  //   }
  // }

  // Music
  // else if (menuOption === 4) {
  //   return (
  //     <div>Component Not Made !</div>
  //   );
  // }
};

export default PageElement;