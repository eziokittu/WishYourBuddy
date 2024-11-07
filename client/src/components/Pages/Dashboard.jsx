import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Backend/context/auth-context';
import Header from '../PageComponents/Header';

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const [loadedPageNames, setLoadedPageNames] = useState();
  const getPageNames = async event => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/pages/get/${auth.userName}/pagenames`
      );
      if (responseData.ok === 1) {
        setLoadedPageNames(responseData.pageNames)
        console.log(responseData.message)
      }
      else {
        console.log("Something went wrong! - " + responseData.message);
        alert("Something went wrong! - " + responseData.message);
      }
    } catch (err) {
      console.log('ERROR loading page! --\n' + err);
    }
  };

  useEffect(() => {
    getPageNames();
  }, [auth]);

  const deletePage = async (pageName) => {
    try {
      // console.log(inputEmail, inputPassword);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/pages/delete/${auth.userName}/${pageName}`,
        'DELETE',
        JSON.stringify({

        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      if (responseData.ok === 1) {
        console.log('Deleting Page successful!');

        // Navigate to the created page after 1 second
        setTimeout(() => {
          window.location.reload(false);
          // navigate(`/${auth.userName}/${inputPageName}`);
          // window.open(`/${auth.userName}/${inputPageName}`, '_blank')
        }, 1000);
      }
      else {
        console.log("Error DeletingPage!" + responseData.message);
        alert("Error Deleting Page! - " + responseData.message);
      }
    } catch (err) {
      console.log('Error Deleting Page! --\n' + err);
    }
  };

  return (
    <div>

      {/* Header */}
      <Header />

      {/* Page Body */}
      <div className='mt-6 pt-6 bg-slate-800 text-gray-300 h-screen'>
        <div className='flex flex-col gap-6 text-center items-center'>

          {/* Title with Page Description */}
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-2xl underline underline-offset-4'>Welcome to 'Wish-Your-Buddy'</p>
            <p>Here you can create a page to wish someone!</p>
            <p>With texts, Colours, music, images and a lot to come! Stay tuned!</p>
          </div>


          <button
            onClick={() => { window.open(`/demo`, '_blank') }}
            className='bg-gray-400 hover:bg-gray-300 text-black px-4 py-2'
          >See DEMO wishing page</button>


          {auth.token && (
            <Link key={'key-create'} to={"/create"}><button className='bg-green-700 hover:bg-green-800 text-white px-4 py-2'>Create a 'wishing page'</button></Link>
          )}

          {loadedPageNames && loadedPageNames.length > 0 && (
            <div className='flex flex-col gap-4 border border-white p-4'>
              <p className='font-bold text-xl'>You have '{loadedPageNames.length}' wishing {loadedPageNames.length === 1 ? 'page' : 'pages'}</p>
              {loadedPageNames.map((loadedPageName, id) => (
                <div key={`key-pagename-${id}`} className='flex flex-row justify-between gap-8 w-full'>
                  <p>{id + 1}.</p>
                  <p
                    key={id}
                    onClick={() => (window.open(`/${auth.userName}/${loadedPageName}`, '_blank'))}
                    className='hover:underline underline-offset-4 cursor-pointer'
                  >{loadedPageName}</p>
                  <button
                    onClick={() => (deletePage(loadedPageName))}
                    className=''
                  >
                    <svg className='w-5 h-5 text-red-600' fill="currentColor" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,0v512h512V0H0z M462.452,462.452H49.548V49.548h412.903V462.452z"></path> </g> </g> <g> <g> <polygon points="355.269,191.767 320.233,156.731 256,220.964 191.767,156.731 156.731,191.767 220.964,256 156.731,320.233 191.767,355.269 256,291.036 320.233,355.269 355.269,320.233 291.036,256 "></polygon> </g> </g> </g></svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {loadedPageNames && loadedPageNames.length === 0 && (
            <p>You don't have any pages yet</p>
          )}

          {!loadedPageNames && (
            <p>Loading your pages</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Dashboard