
import React from 'react'
import { useLocation } from 'react-router-dom'
import SidebarItems from '../SidebarItems'

function AdminSidebar() {
  const {pathname} =useLocation()

  const isActive =(pn)=>{
    if (pn === pathname) return 'active' 
    if (pathname.split('/').includes(pn)) return 'active'
    
  }
  return (
    <>
    <div className="card  shadow mt-3 h-100 d-flex flex-column sideBarColor" >
      <div className='mt-5 d-flex flex-column'>
          <SidebarItems path={'/admin'} name={'User Management'} icon={'fa-solid fa-user'} isActive={isActive('/admin')} />
          <SidebarItems path={'/admin/posts'} name={'Post Management'} icon={'fa-solid fa-list'} isActive={isActive('/admin/posts')} />
          <SidebarItems path={'/admin/reports'} name={'Reports'} icon={'fa-solid fa-exclamation'} isActive={isActive('/admin/reports')} />
    </div>
    </div>
    </>
  )
}

export default AdminSidebar