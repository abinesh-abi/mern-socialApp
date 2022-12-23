import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import SidebarItems from './SidebarItems' 

function Sidebar() {
  const {auth} = useSelector(state=>state)
  const {pathname} =useLocation()

  const isActive =(pn)=>{
    if (pn === pathname) return 'active' 
    if (pathname.split('/').includes(pn)) return 'active'
    
  }
  return (
    <>
    <div className="card  shadow mt-3 h-100 d-flex flex-column sideBarColor" >
      <div className='mt-5 d-flex flex-column'>
          <SidebarItems path={'/'} name={'Home'} icon={'fa-solid fa-house'} isActive={isActive('/')} />
          <SidebarItems path={`/profile/${auth?.user?._id}`} name={'Profile'} icon={"fa-solid fa-user"}isActive={isActive('profile')}/>
          <SidebarItems path={`/saved`} name={'Saved Posts'} icon={"fa-solid fa-bookmark"}isActive={isActive('saved')}/>
          <SidebarItems path={'/chat'} name={'Chat'} icon={'fa-solid fa-message'} isActive={isActive('chat')}/>
          <SidebarItems path={'/notification'} name={'Notification'} icon={'fa-solid fa-bell '}isActive={isActive('notification')}/>
    </div>
    </div>
    </>
  )
}

export default Sidebar