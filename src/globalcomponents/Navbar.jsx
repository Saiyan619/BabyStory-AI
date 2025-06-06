import React from 'react'
import NavbarDrawer from './NavbarDrawer'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>About</a></li>
        <li><a>Features</a> </li>
        <li><a>Pricing</a></li>
        <Link className="btn btn-primary" to="/dashboard">
        Dashboard
            </Link>
            <Link className="btn btn-primary" to="/login">
        Login
        </Link>
        
        <Link className="btn btn-ghost" to="/signup">
        Sign Up
        </Link>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl ml-5 sm:ml-0">
        <img className='w-32' src="./babystory-high-resolution-logo-removebg-preview.png" alt="logo" />
    </a>
  </div>
  <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          
    <li><a>About</a></li>
        <li><a>Features</a> </li>
        <li><a>Pricing</a></li>
    </ul>
  </div>
      <div className="navbar-end gap-4 hidden md:flex">
        <Link className="btn btn-primary" to="/login">
        Login
        </Link>
        
        <Link className="btn btn-ghost" to="/signup">
        Sign Up
        </Link>
  </div>
</div>
  )
}

export default Navbar
