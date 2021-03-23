import { Route } from 'react-router-dom'
import { isAuthenticated, signOut } from './HelperFunctions'
import { Link, withRouter } from 'react-router-dom'

const BluePrint = ({ children, match }) => {
  const active = window.location.pathname

  const navigation = () => (
    <ul className='nav nav-tabs bg-light d-flex justify-content-between p-2'>
      <li className='nav-item'>
        <Link
          to='/'
          className={`nav-link pt-2 pb-2 ${active === '/' && 'active'}`}
        >
          Home
        </Link>
      </li>

      {!isAuthenticated() && (
        <>
          <li className='nav-item'>
            <Link
              to='/login'
              className={`nav-link pt-2 pb-2 ${
                active === '/login' && 'active'
              }`}
            >
              Log In
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to='/register'
              className={`nav-link pt-2 pb-2 ${
                active === '/register' && 'active'
              }`}
            >
              Register
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && isAuthenticated().role === 'admin' && (
        <li className='nav-item'>
          <Link
            to='/admin'
            className={`nav-link pt-2 pb-2 ${active === '/admin' && 'active'}`}
          >
            {isAuthenticated().name}´s Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().role === 'customer' && (
        <li className='nav-item'>
          <Link
            to='/user/dashboard'
            className={`nav-link pt-2 pb-2 ${
              active === '/user/dashboard'
                ? 'active'
                : active === '/user/dashboard/seller'
                ? 'active'
                : active === '/user/dashboard/profile'
                ? 'active'
                : ''
            }`}
          >
            {isAuthenticated().name}´s Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && (
        <Route
          render={({ history }) => (
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-link pt-2 pb-2'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  signOut(() => {
                    history.push('/')
                  })
                }}
              >
                Log Out
              </Link>
            </li>
          )}
        />
      )}
    </ul>
  )

  return (
    <>
      {navigation()}
      <div>{children}</div>
    </>
  )
}

export default withRouter(BluePrint)
