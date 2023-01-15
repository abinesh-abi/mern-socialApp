import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ProfileIcon from './common/ProfileIcon'
import SidebarItems from './SidebarItems' 
import SidebarMobileItems from './SidebarMobileItems'

function Sidebar() {
  const {auth} = useSelector(state=>state)
  const {pathname} =useLocation()
  let isAdmin = pathname.split('/').includes("admin")

  const isActive =(pn)=>{
    if (pn === pathname) return 'active' 
    if (pathname.split('/').includes(pn)) return 'active'
    
  }
  return (
    <>
    {/* ---for desktop ----------- */}
    <div className="card  shadow mt-3 h-100 sideBarColor sidebar" >
      <div className='mt-5 d-flex flex-column'>
          <SidebarItems path={'/'} name={'Home'} icon={'fa-solid fa-house'} isActive={isActive('/')} />
          <SidebarItems path={`/profile/${auth?.user?._id}`} name={'Profile'} icon={"fa-solid fa-user"}isActive={isActive('profile')}/>
          <SidebarItems path={`/friends`} name={'Friends'} icon={"fa-solid fa-users"}isActive={isActive('friends')}/>
          <SidebarItems path={`/saved`} name={'Saved Posts'} icon={"fa-solid fa-bookmark"}isActive={isActive('saved')}/>
          <SidebarItems path={'/chat'} name={'Chat'} icon={'fa-solid fa-message'} isActive={isActive('chat')}/>
          <SidebarItems path={'/notification'} name={'Notification'} icon={'fa-solid fa-bell '}isActive={isActive('notification')}/>
    </div>
    </div>
    {/* ---for mobile ----------- */}
    <div >
    <div className='sideBar-mobile d-flex justify-content-around'>
          <SidebarMobileItems path={'/'} name={'Home'} icon={'fa-solid fa-house'} isActive={isActive('/')} />
          <SidebarMobileItems path={`/profile/${auth?.user?._id}`} name={'Profile'} icon={"fa-solid fa-user"}isActive={isActive('profile')}/>
          <SidebarMobileItems path={`/friends`} name={'Friends'} icon={"fa-solid fa-users"}isActive={isActive('friends')}/>
          <SidebarMobileItems path={`/saved`} name={'Saved Posts'} icon={"fa-solid fa-bookmark"}isActive={isActive('saved')}/>
          <SidebarMobileItems path={'/chat'} name={'Chat'} icon={'fa-solid fa-message'} isActive={isActive('chat')}/>
          <SidebarMobileItems path={'/notification'} name={'Notification'} icon={'fa-solid fa-bell '}isActive={isActive('notification')}/>
    </div>
    </div>
    </>
  )
}

export default Sidebar