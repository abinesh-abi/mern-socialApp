import React from 'react'
import { Link } from 'react-router-dom'

function SidebarItems({path,name,icon}) {
  return (
      // <Link className="px-4 my-1 py-3 text-white shadow-sm" to={path}>{name}</Link>
      <Link to={path} className="px-2 my-1 py-3 text-white shadow-sm">
       <b className={`px-2 text-white ${icon}`}></b>
       <b className="text-white" >{name}</b>
      </Link>
  )
}

export default SidebarItems