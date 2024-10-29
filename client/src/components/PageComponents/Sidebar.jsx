import React from 'react';
import SidebarButton from '../Reusable/Buttons/SidebarButton';

const Sidebar = () => {
  return (
    <div className='relative flex flex-col gap-2'>
      <SidebarButton section={'Backgrounds'} names={['Solid Colour', 'snowfall', 'Stars']} links={['/', '/', '/']} />
      <SidebarButton section={'Texts'} names={['Add Text']} links={['/']} />
      <SidebarButton section={'Images'} names={['Gallery 1', 'Gallery 2', 'Gallery 3']} links={['/', '/', '/']} />
      <SidebarButton section={'Music'} names={['Add Music']} links={['/']} />
    </div>
  )
}

export default Sidebar