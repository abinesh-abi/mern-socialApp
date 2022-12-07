import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SidebarItems from './SidebarItems'

function Sidebar() {
  const {auth} = useSelector(state=>state)
  return (
    <>
    {/* <div className=" rounded shadow mt-3 h-100 d-flex flex-column" style={{background:'#868B8E'}}> */}
    <div className="card  shadow mt-3 h-100 d-flex flex-column" style={{background:'#868B8E'}}>
      <div className='mt-5 d-flex flex-column' style={{background:'#868B8E'}}>
          <SidebarItems path={'/'} name={'Home'} icon={'fa-solid fa-house'}/>
          <SidebarItems path={`/profile/${auth?.user?._id}`} name={'Profile'} icon={"fa-solid fa-user"}/>
          <SidebarItems path={`/saved`} name={'Saved Posts'} icon={"fa-solid fa-bookmark"}/>
          <SidebarItems path={'/message'} name={'Message'} icon={'fa-solid fa-message'}/>
          <SidebarItems path={'/notification'} name={'Notification'} icon={'fa-solid fa-bell '}/>
    </div>
    </div>
    </>
  )
}

export default Sidebar