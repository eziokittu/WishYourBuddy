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
      <div className='flex flex-row justify-between'>
        {/* Left Logo */}
        <div>
          <p>Wish-Your-Buddy</p>
        </div>

        {/* Right Menu options */}
        <div className='flex flex-row gap-x-4'>
          <div>
            <Link to={"/demo"}>See Demo</Link>
          </div>

          {auth.token ? (
            auth.isAdmin ? (
              <div>
                <button>{auth.email}</button>
              </div>
            ) : (
              <div>
                <button>{auth.email}</button>
              </div>
            )
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