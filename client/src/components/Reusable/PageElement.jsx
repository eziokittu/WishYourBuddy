import React from 'react';

const coloursToBeUsed = [
  "bg-red-900",
  "bg-green-900",
  "bg-blue-900",
];

const PageElement = ({ type, content, colour, children }) => {
  if (type === "text") {
    return (
      <div className="text-justify bg-stone-900 text-white p-4 rounded-2xl border-2 border-stone-600">
        <p>{content}</p>
      </div>
    );
  } else if (type === "background") {
    return (
      <div className={` w-[400px] h-fit ${colour ? `bg-${colour}-900` : 'bg-stone-950'} p-4`}>
        {children}
      </div>
    );
  } else {
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
};

export default PageElement;