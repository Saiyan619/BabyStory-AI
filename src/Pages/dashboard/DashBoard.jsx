import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Navbar from './component/Navbar' // Your navbar with drawer toggle

const DashBoard = () => {

  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <p className="text-center p-2">
            {/* Welcome {user ? user.name === "" ? "Parent" : user.name : "Guest"} */}
          </p>
          <Outlet /> {/* This renders the nested route */}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li><Link to="/dashboard">Dashboard Home</Link></li>
            <li><Link to="/dashboard/settings">Settings</Link></li>
            <li><Link to="/dashboard/profile">Profile</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
