import React, { useState } from 'react';
import Header from '../PageComponents/Header';
import Sidebar from '../PageComponents/Sidebar';
import PreviewPage from '../PageComponents/PreviewPage';

const CreatePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuOption, setMenuOption] = useState(0);
  const [optionChosen, setOptionChosen] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const chooseOption = (op) => {
    // console.log("Option Chosed: ", op);
    setOptionChosen(op);
  };

  return (
    <div className='h-screen flex flex-col bg-slate-800'>
      <Header />
      <div className='bg-slate-800 text-gray-300 flex flex-row w-screen h-screen'>
        {/* Sidebar with responsive visibility */}
        <div
          className={`bg-slate-900 fixed inset-y-0 top-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-mybtn-gray-light scrollbar-track-mybg-dark 
          ${isSidebarOpen ? 'block' : 'hidden'} md:block w-5/6 xsm:w-2/3 sm:w-3/5 md:w-80 z-10 transition-transform duration-300`}
        >
          <Sidebar menuOption={menuOption} setMenuOption={setMenuOption} chooseOption={chooseOption} />
        </div>

        {/* Close button for mobile view */}
        {isSidebarOpen && (
          <div onClick={toggleSidebar} className='fixed top-8 right-0 h-full w-1/6 xsm:w-1/3 sm:w-2/5 bg-black/70 flex items-center justify-left cursor-pointer text-white z-20 md:hidden'>
            <div className='text-6xl xsm:text-8xl bg-slate-900/70 rounded-r-3xl flex items-center'>
              <p className='animate-[pulse_0.8s_ease-in-out_infinite] -translate-y-2 xsm:-translate-y-3'>{`<`}</p>
            </div>
          </div>
        )}

        {/* Hamburger button for mobile view */}
        {!isSidebarOpen && (
          <div onClick={toggleSidebar} className='fixed top-10 left-2 z-20 w-10 h-10 bg-slate-100 flex items-center justify-center cursor-pointer font-bold text-2xl text-slate-900 animate-pulse hover:animate-none md:hidden'>
            <p>☰</p>
          </div>
        )}

        {/* Preview Page Area */}
        <div className='bg-slate-800 flex-grow h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-mybtn-gray-light scrollbar-track-mybg-dark md:ml-80'>
          <PreviewPage menuOption={menuOption} optionChosen={optionChosen} />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
