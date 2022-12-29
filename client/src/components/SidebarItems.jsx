import React from 'react'
import { Link } from 'react-router-dom'

function SidebarItems({path,name,icon,isActive}) {
  return (
      <Link to={path} className={`px-2 my-1 py-3 text-white shadow-sm ${isActive && 'bg-white rounded mx-1'}`} style={{textDecoration:'none'}}>
       <b className={`px-2 h4 text-white ${icon} ${isActive && 'text-primary'} `}></b>
       <b className={`text-white ${isActive && 'text-secondary h5'}`} >{name}</b>
      </Link>
  )
}

export default SidebarItems