import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Backend/context/auth-context';
import CustomButton1 from '../Reusable/Buttons/CustomButton1';

const PreviewPage = () => {
  const auth = useContext(AuthContext);
  const [pageName, setPageName] = useState("page1");

  return (
    <div className='flex flex-col'>
      {/* Heading */}
      <div className='text-center mt-8 mb-4'>
        <p className='text-2xl underline underline-offset-8'>Preview your page</p>
      </div>
      <div className='flex flex-col text-center'>
        All the contents
      </div>

      {/* Create and view Page */}
      <div className='flex flex-row mx-auto items-center justify-center border-2 rounded-full px-4 py-4'>

        {/* Enter page name */}
        <div className='flex flex-row text-center items-center gap-2 mr-12'>
          <label for="pagename" className="w-fit">Enter Page Name</label>
          <input
            onChange={(event) => setPageName(event.target.value)}
            type="text"
            name="pagename"
            id="pagename"
            className="w-40 text-black px-4 py-2 rounded-3xl"
            placeholder="Enter page name"
            defaultValue={pageName}
            required=""
          />
        </div>

        {/* Create button */}
        <CustomButton1 name={`Create and View Page`} link={() => { window.open(`/${auth.userName}/${pageName}`, '_blank') }}/>
      </div>
    </div>
  )
}

export default PreviewPage