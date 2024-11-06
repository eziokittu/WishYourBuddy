import React, { useState } from 'react';
import Header from '../PageComponents/Header';
import Sidebar from '../PageComponents/Sidebar';
import PreviewPage from '../PageComponents/PreviewPage';

const CreatePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuOption, setMenuOption] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const chooseOption = (op) => {
    setOptionChosen(op);
  }

  return (
    <div className='h-screen flex flex-col bg-slate-800'>
      <Header />
      <div className='bg-slate-800 text-gray-300'>

        {/* For medium screens and above */}
        <div className='hidden md:flex flex-row w-screen h-screen'>
          {/* Sidebar menu */}
          <div className='bg-slate-900 fixed inset-y-0 top-6 w-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-950'>
            <Sidebar menuOption={menuOption} setMenuOption={setMenuOption} chooseOption={chooseOption} />
          </div>

          {/* Preview Page */}
          <div className='bg-slate-800 ml-80 flex-grow h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-950'>
            <PreviewPage menuOption={menuOption} optionChosen={optionChosen} />
          </div>
        </div>

        {/* For smaller screens */}
        <div className='md:hidden flex flex-row relative'>
          {/* Sidebar with slide-in/out animation */}
          <div className={`fixed z-10 inset-y-0 top-6 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-slate-900 w-5/6 xsm:w-2/3 sm:w-3/5 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-950`}>
            <Sidebar menuOption={menuOption} setMenuOption={setMenuOption} chooseOption={chooseOption} />
          </div>

          {/* Fixed Close Button on the Right Side of Sidebar */}
          {isSidebarOpen && (
            <div onClick={toggleSidebar} className='fixed top-6 right-0 h-full w-1/6 xsm:w-1/3 sm:w-2/5 bg-black/70 flex items-center justify-left cursor-pointer text-white z-20'>
              <div className='text-6xl xsm:text-8xl bg-slate-900/70 rounded-r-3xl flex items-center'>
                <p className='animate-[pulse_0.8s_ease-in-out_infinite] -translate-y-2 xsm:-translate-y-3'>{`<`}</p>
              </div>
            </div>
          )}

          {/* ☰ Hamburger button for opening sidebar */}
          {!isSidebarOpen && (
            <div onClick={toggleSidebar} className='fixed top-8 left-2 z-20 w-10 h-10 bg-slate-100 flex items-center justify-center cursor-pointer font-bold text-2xl text-slate-900 animate-pulse hover:animate-none'>
              <p className=''>☰</p>
            </div>
          )}

          {/* Preview Page */}
          <div className='bg-slate-800 fixed inset-y-0 top-6 w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-950'>
            <PreviewPage menuOption={menuOption} optionChosen={optionChosen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
