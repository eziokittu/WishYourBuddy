import React from 'react';
import SidebarButtonOpen from '../Reusable/Buttons/SidebarButtonOpen';
import SidebarButtonClose from '../Reusable/Buttons/SidebarButtonClose';
import SidebarButtonOption from '../Reusable/Buttons/SidebarButtonOption';

const Sidebar = ({ menuOption, setMenuOption }) => {
  return (
    <div className='relative flex flex-col gap-2'>

      {/* Backgrounds */}
      <div className='border-b border-slate-200 px-2 flex flex-col'>

        <div className='flex flex-row justify-between items-center'>
          <p className='text-xl'>Backgrounds</p>
          {menuOption !== 1 ? (
            <SidebarButtonOpen onclick={() => {setMenuOption(1)}} />
          ) : (
            <SidebarButtonClose onclick={() => {setMenuOption(0)}} />
          )}
        </div>

        {menuOption === 1 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption key={"bg-1"} title={"Solid Colour"} />

            {/* Option 2 */}
            <SidebarButtonOption key={"bg-2"} title={"Snowfall"} />

            {/* Option 3 */}
            <SidebarButtonOption key={"bg-3"} title={"Stars"} />
          </div>
        )}
      </div>

      {/* Texts */}
      <div className='border-b border-slate-200 px-2 flex flex-col'>

        <div className='flex flex-row justify-between items-center'>
          <p className='text-xl'>Texts</p>
          {menuOption !== 2 ? (
            <SidebarButtonOpen onclick={() => {setMenuOption(2)}} />
          ) : (
            <SidebarButtonClose onclick={() => {setMenuOption(0)}} />
          )}
        </div>

        {menuOption === 2 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption key={"text-1"} title={"Default Text"} />
          </div>
        )}
      </div>

      {/* Images */}
      <div className='border-b border-slate-200 px-2 flex flex-col'>

        <div className='flex flex-row justify-between items-center'>
          <p className='text-xl'>Image Gallerys</p>
          {menuOption !== 3 ? (
            <SidebarButtonOpen onclick={() => {setMenuOption(3)}} />
          ) : (
            <SidebarButtonClose onclick={() => {setMenuOption(0)}} />
          )}
        </div>

        {menuOption === 3 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption key={"gallery-1"} title={"Gallery 1"} />

            {/* Option 2 */}
            <SidebarButtonOption key={"gallery-2"} title={"Gallery 2"} />

            {/* Option 3 */}
            <SidebarButtonOption key={"gallery-3"} title={"Gallery 3"} />
          </div>
        )}
      </div>
      
      {/* Music */}
      <div className='border-b border-slate-200 px-2 flex flex-col'>

        <div className='flex flex-row justify-between items-center'>
          <p className='text-xl'>Music</p>
          {menuOption !== 4 ? (
            <SidebarButtonOpen onclick={() => {setMenuOption(4)}} />
          ) : (
            <SidebarButtonClose onclick={() => {setMenuOption(0)}} />
          )}
        </div>

        {menuOption === 4 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption key={"music-1"} title={"Default Music"} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar