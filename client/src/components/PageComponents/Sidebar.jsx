import React from 'react';
import SidebarButton from '../Reusable/Buttons/SidebarButton';

const Sidebar = () => {
  return (
    <div className='relative flex flex-col gap-2'>
      <SidebarButton section={'Backgrounds'} names={['Solid Colour', 'snowfall', 'Stars']} links={['/', '/', '/']} />
      <SidebarButton section={'Texts'} names={['bg1', 'bg2', 'bg3']} links={['/', '/', '/']} />
      <SidebarButton section={'Images'} names={['bg1', 'bg2', 'bg3']} links={['/', '/', '/']} />
      <SidebarButton section={'Music'} names={['bg1', 'bg2', 'bg3']} links={['/', '/', '/']} />
    </div>
  )
}

export default Sidebar