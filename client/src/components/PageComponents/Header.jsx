import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Backend/context/auth-context';

const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userLogout = () => {
		setTimeout(() => {
			auth.logout();
			// window.location.reload(false);
			navigate('/')
		}, 1000);
	}

  return (
    <div>
      <div className='fixed top-0 h-8 px-2 w-full flex flex-row justify-between bg-mybg-basic text-slate-50 border-b border-white'>
        {/* Left Logo */}
        <div className='flex flex-row items-center'>
          <Link to={"/"}><button>Wish-Your-Buddy</button></Link>
        </div>

        {/* Right Menu options */}
        <div className='flex flex-row gap-x-4 items-center'>
          {auth.token ? (
            <div>
              <Link to={"/settings"}><button>Settings</button></Link>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>Login</Link>
            </div>
          )}

          {auth.token && (
            <button onClick={userLogout}>logout</button>
          )}

        </div>
      </div>
    </div>
  )
}

export default Header