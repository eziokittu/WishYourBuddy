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
      <div className='fixed top-0 h-6 w-full flex flex-row justify-between bg-slate-900 text-slate-50'>
        {/* Left Logo */}
        <div>
          <Link to={"/"}><button>Wish-Your-Buddy</button></Link>
        </div>

        {/* Right Menu options */}
        <div className='flex flex-row gap-x-4'>
          <div>
            {/* <Link to={"/demo"}>See Demo</Link> */}
            <button onClick={() => { window.open(`/demo`, '_blank') }}>Demo</button>
          </div>

          {auth.token ? (
            <div>
              <Link to={"/settings"}><button>{auth.email.split('@')[0]}</button></Link>
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