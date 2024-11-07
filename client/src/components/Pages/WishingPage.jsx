import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../Backend/hooks/http-hook';
import { AuthContext } from '../Backend/context/auth-context';
import PageElement from "../Reusable/PageElement";

const WishingPage = () => {
  const auth = useContext(AuthContext);
  const { username, pagename } = useParams();
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const [loadedPage, setLoadedPage] = useState();
  const getPage = async event => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/pages/get/${username}/page/${pagename}`
      );
      if (responseData.ok === 1) {
        setLoadedPage(responseData.page)
        console.log(responseData.message)
      }
      else {
        console.log("Something went wrong! - " + responseData.message);
        alert("Something went wrong! - " + responseData.message);
        setTimeout(() => {
          // window.location.reload(false);
          navigate('/')
        }, 1000);
      }
    } catch (err) {
      console.log('ERROR loading page! --\n' + err);
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  if (loadedPage) {
    return (
      <div className='bg-slate-800 text-gray-300 h-screen flex'>
        {loadedPage.pageElements.filter(pageElement => pageElement.type === 'background').map(pageElement => (
          <PageElement
            type={'background'}
            id={pageElement.id}
            key={pageElement.id}
            colour={pageElement.colour}
          >
            <div className='flex flex-col gap-4 justify-center'>
              {loadedPage.pageElements.filter(pageElement => pageElement.type !== 'background').map(pageElement => (
                <PageElement
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
    )
  }
  else {
    return (
      <div className='bg-slate-800 text-gray-300 h-screen flex'>
        <p className='text-center justify-center m-auto text-6xl'>Loading Page ...</p>
      </div>
    )
  }
}

export default WishingPage