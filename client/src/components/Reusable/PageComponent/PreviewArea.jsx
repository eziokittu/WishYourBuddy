import React, { useEffect } from 'react';
import PageElement from "./PageElement";

const PreviewArea = ({ pageElements, optionChosen }) => {
  return (
    <div className='flex flex-col items-center gap-1 xsm:gap-2 bg-mybg-basic border border-white rounded-2xl m-2 xsm:m-4'>
      {/* Heading */}
      <p className='pt-2'>Page Preview</p>

      {/* Viewing Window */}
      <div className='w-full min-h-[300px] p-2 xsm:p-4 flex justify-center items-center'>
        {pageElements.filter(pageElement => pageElement.type === 'background').map(pageElement => (
          <PageElement
            optionChosen={optionChosen}
            type={'background'}
            id={pageElement.id}
            key={pageElement.id}
            colour={pageElement.colour}
          >
            <div className='flex flex-col gap-4 justify-center'>
              {pageElements.filter(pageElement => pageElement.type !== 'background').map(pageElement => (
                <PageElement
                  optionChosen={optionChosen}
                  key={pageElement.id}
                  id={pageElement.id}
                  type={pageElement.type}
                  content={pageElement.content}
                  colour={pageElement.colour}
                />
              ))}
            </div>
          </PageElement>
        ))}
      </div>
    </div>
  )
}

export default PreviewArea