import React, { useRef, useState } from 'react';
import ImageViewer3 from "../Reusable/ImageViewer3";
import AudioPlayer from 'react-h5-audio-player';

import allData from '../../data/allData.json';

const customAudioPlayerStyles = `
  .rhap_progress-section, 
  .rhap_volume-container, 
  .rhap_time, 
  .rhap_current-time, 
  .rhap_total-time, 
  .rhap_download-progress,
  .rhap_volume-button,
  .rhap_repeat-button,
  .rhap_additional-controls,
  .rhap_controls-section {
    display: none !important;
  }
  .rhap_main-controls-button {
    margin: 0 auto; /* Center the play button */
  }
`;

const DemoPage = () => {
  const playerRef = useRef();
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.audio.current.play().catch((error) => {
        console.log('Play failed:', error);
      });
    }
  };

  const [pressed, setPressed] = useState(false);

  return (
    <>
      <div className={`fixed top-4 left-4 z-20 bg-pink-300 text-pink-900 rounded-2xl border-2 border-pink-900 px-3 py-1 cursor-default ml-auto ${pressed ? 'opacity-0' : ''}`}>
        <style>
          {customAudioPlayerStyles}
        </style>
        <button className='cursor-default' onClick={()=>{handlePlay(); setPressed(true)}}>▶ Play Music</button>
        <AudioPlayer
          ref={playerRef}
          loop
          volume={0.2}
          src={allData.music3}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          showJumpControls={false}
        />
      </div>
      <div className='fixed w-screen h-screen bg-stone-950 z-0'></div>
      <div className='relative z-10 lg:w-[1014px] px-4 mx-auto font-Jaldi grid grid-cols-1 sm:grid-cols-2 justify-around items-center sm:h-screen'>
        {/* All the written content */}
        <div className='text-stone-400 flex flex-col text-justify'>
          {/* Page Heading */}
          <div className='text-center text-4xl xsm:text-6xl mb-8 pt-8 sm:pt-0 '>
            <p>To</p>
            <p className='text-stone-200'>🐵 Sinu 🐒</p>
          </div>

          {/* Page Content */}
          <div className='text-xl xsm:text-2xl flex flex-col gap-4 pb-8 sm:pb-0'>
            <p>ना पहुंच पाए तुम तक कोई आघात, बस ख़ुशियों ही ख़ुशियों की हो बरसात। हासिल हो तुमको तुम्हारे सारे मुक़ाम, रोशन करो तुम जग में अपनों का खूब नाम।</p>
            <p>जन्मदिन की शुभकामनाएँ दिल से तुम्हें, खुशियों की बगिया महके सदा तुम्हारे गले में। सपनों के सितारे यूँ ही चमकते रहें, हर खुशी का पल तुम्हारे जीवन में बसे। </p>
            <p className='font-bold text-center text-4xl xsm:text-6xl text-pink-300'>🎉🎂🥳</p>
            <p className='font-bold text-center text-4xl xsm:text-6xl text-pink-300'>Happy Birthday 🌸 </p>
            <p className='text-center text-stone-200'>~ 😺 Bandariya 🙈 ~</p>
          </div>
        </div>

        {/* Displaying the images */}
        <div className=''>
          <div className='hidden sm:flex h-[400px]'>
            <ImageViewer3 data={allData.images_all} isMobile={false} />
          </div>
          <div className='flex sm:hidden h-[400px] pb-8'>
            <ImageViewer3 data={allData.images_mobile5} isMobile={true} />
          </div>
        </div>

      </div>
    </>
  )
}

export default DemoPage