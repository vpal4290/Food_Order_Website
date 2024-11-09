import React from 'react'
import './Sidebar.css'
import Navbar from '../Navbar/Navbar'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div>
        <div className="sidebar">
          <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
              <img src={assets.add_icon} alt="" />
              <p>Add Items</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
              <img src={assets.order_icon} alt="" />
              <p>List Items</p>
            </NavLink>
            <NavLink to="/order" className="sidebar-option">
              <img src={assets.order_icon} alt="" />
              <p>Orders</p>
            </NavLink>
          </div>
        </div>
       </div>
  )
}

export default Sidebar