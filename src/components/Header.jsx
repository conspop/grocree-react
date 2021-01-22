import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header({user, handleLogout}) {

  return (
    <div className='header-container'>
      <div className='header-main'>
        <div>GROCREE</div>
        <div><Auth user={user} handleLogout={handleLogout} /></div>
      </div>
      <div className='header-nav'>
        <NavLink path='/staples' pathName='Staples' />
        <NavLink path='/recipes' pathName='Recipes' />
        <NavLink path='/lists' pathName='Lists' />
      </div>
    </div>
  )
}

function NavLink({path, pathName}) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Link 
      to={path}
      className={path === currentPath ? 'activeLink' : false}
    >
      {pathName}
    </Link>
  )

}

function Auth({user, handleLogout}) {
  if (user) {
    return (
      <>
        Hi {user.username}!&nbsp;&nbsp;&nbsp;
        <Link to='' onClick={handleLogout}>Log Out</Link>
      </>
    )
  } else {
    return (
      <>
        <Link to='/login'>Log In</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to='/signup'>Sign Up</Link>
      </>
    )
  }
}

