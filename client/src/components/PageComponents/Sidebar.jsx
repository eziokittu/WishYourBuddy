import React from 'react';
import SidebarButton from '../Reusable/Buttons/SidebarButton';
import SidebarButtonOption from '../Reusable/Buttons/SidebarButtonOption';
import optionData from '../../data/optionData.json';

const Sidebar = ({ menuOption, setMenuOption, chooseOption }) => {
  return (
    <div className='relative flex flex-col gap-2 my-4'>

      {/* Backgrounds */}
      <div className='border-b border-slate-200 px-2 flex flex-col bg-slate-800 hover:bg-slate-700'>

        <SidebarButton optionDataOption={optionData.backgrounds} optionDataDefault={optionData.default} menuOptionNumber={1} setMenuOption={setMenuOption} menuOption={menuOption} chooseOption={chooseOption} />

        {menuOption === 1 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption
              key={optionData.backgrounds.keys[0]}
              title={optionData.backgrounds.options[0]}
              chooseOption={chooseOption}
              optionValue={optionData.backgrounds.option_values[0]}
            />

            {/* Option 2 */}
            <SidebarButtonOption
              key={optionData.backgrounds.keys[1]}
              title={optionData.backgrounds.options[1]}
              chooseOption={chooseOption}
              optionValue={optionData.backgrounds.option_values[1]}
            />

            {/* Option 3 */}
            <SidebarButtonOption
              key={optionData.backgrounds.keys[2]}
              title={optionData.backgrounds.options[2]}
              chooseOption={chooseOption}
              optionValue={optionData.backgrounds.option_values[2]}
            />
          </div>
        )}
      </div>

      {/* Texts */}
      <div className='border-b border-slate-200 px-2 flex flex-col bg-slate-800 hover:bg-slate-700'>

        <SidebarButton optionDataOption={optionData.texts} optionDataDefault={optionData.default} menuOptionNumber={2} setMenuOption={setMenuOption} menuOption={menuOption} chooseOption={chooseOption} />

        {menuOption === 2 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption
              key={optionData.texts.keys[0]}
              title={optionData.texts.options[0]}
              chooseOption={chooseOption}
              optionValue={optionData.texts.option_values[0]}
            />
          </div>
        )}
      </div>

      {/* Gallerys */}
      <div className='border-b border-slate-200 px-2 flex flex-col bg-slate-800 hover:bg-slate-700'>

        <SidebarButton optionDataOption={optionData.gallerys} optionDataDefault={optionData.default} menuOptionNumber={3} setMenuOption={setMenuOption} menuOption={menuOption} chooseOption={chooseOption} />

        {menuOption === 3 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption key={optionData.gallerys.keys[0]} title={optionData.gallerys.options[0]} chooseOption={chooseOption} optionValue={optionData.gallerys.option_values[0]} />

            {/* Option 2 */}
            <SidebarButtonOption key={optionData.gallerys.keys[1]} title={optionData.gallerys.options[1]} chooseOption={chooseOption} optionValue={optionData.gallerys.option_values[1]} />

            {/* Option 3 */}
            <SidebarButtonOption key={optionData.gallerys.keys[2]} title={optionData.gallerys.options[2]} chooseOption={chooseOption} optionValue={optionData.gallerys.option_values[2]} />
          </div>
        )}
      </div>

      {/* Music */}
      <div className='border-b border-slate-200 px-2 flex flex-col bg-slate-800 hover:bg-slate-700'>

        <SidebarButton optionDataOption={optionData.music} optionDataDefault={optionData.default} menuOptionNumber={4} setMenuOption={setMenuOption} menuOption={menuOption} chooseOption={chooseOption} />
        
        {menuOption === 4 && (
          <div className='flex flex-col gap-2 my-2 ml-2'>

            {/* Option 1 */}
            <SidebarButtonOption key={optionData.music.keys[0]} title={optionData.music.options[0]} chooseOption={chooseOption} optionValue={optionData.music.option_values[0]} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar