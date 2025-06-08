import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
    const navItems = [
        { to: ".", icon: assets.home_icon, label: "Dashboard", end: true },
        { to: "addBlog", icon: assets.add_icon, label: "Add blogs" },
        { to: "listBlog", icon: assets.list_icon, label: "Blog lists" },
        { to: "comments", icon: assets.comment_icon, label: "Comments" },
      ];
      const baseClass = "flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer";

      return (
        <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
          {navItems.map(({ to, icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`
              }
            >
              <img src={icon} alt={`${label} Icon`} className="min-w-5 w-5" />
              <p className="hidden md:inline-block">{label}</p>
            </NavLink>
          ))}
        </div>
      )
}
  
export default Sidebar
