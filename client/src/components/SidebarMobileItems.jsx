import React from 'react'
import { Link } from 'react-router-dom'

function SidebarMobileItems({path,icon,isActive}) {
  return (
      <Link to={path} className={`px-2 py-2 shadow  rounded  ${isActive ? 'sidebar-mobile-items mx-1 ' :'bg-white'}`} style={{textDecoration:'none'}}>
       <b className={`${icon} ${isActive ? 'text-white px-2 h4':'h6 px-2 text-dark'}`}></b>
      </Link>
  )
}

export default SidebarMobileItems