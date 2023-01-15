import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, } from 'react-router-dom'
import { logout } from '../redux/actions/authAction'
import SearchModel from './SearchModel'
import '../../src/styles/seacrchModel.css'
import config from '../utils/config'
import ProfileIcon from './common/ProfileIcon'

function Header() {
  const {auth,adminAuth} = useSelector(state=>state)


  const [searchOrNot, setSearchOrNot] = useState(false)

  let dispatch = useDispatch()
  const {pathname} =useLocation()
  let isAdmin = pathname.split('/').includes("admin")

  const isActive =(pn)=>{
    if (pn === pathname) return 'active'
  }
  let userName =auth?.user?.fullname?.split(' ')[0]
  let adminName = adminAuth?.admin?.admin


  return (
  <>
    <div className='w-100 headder' style={{position:'fixed',zIndex:'2'}}>
<nav className="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 " >
  <Link className="navbar-brand" to={'/'}>SocialApp</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
    aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
    <ul className="navbar-nav ml-auto nav-flex-icons">
      <li className={`nav-item  px-2`}>
        <a className="fa-solid nav-link active fa-magnifying-glass" 
          onClick={e=>{
            // let sercModel = document.getElementById('search')
            // sercModel.style.visibility = 'visible'
            // sercModel.style.opacity = '1'
            setSearchOrNot(val=>!val)
          }}
        ></a>
      </li> 
      {
        isAdmin ? 
      <li className={`nav-item  px-2 ${isActive('/admin')}`}>
        <Link className="fa-solid nav-link fa-house"to="/admin"></Link>
      </li> :
      <li className={`nav-item  px-2 ${isActive('/')}`}>
        <Link className="fa-solid nav-link fa-house"to="/"></Link>
      </li> 
      }
      
      {
        !isAdmin && <li className={`nav-item  px-3 ${isActive('/chat')}`}>
        <Link className="fa-solid fa-message nav-link" to="/chat"></Link>
      </li>
      }
      {
        isAdmin ? 
      <li className={`nav-item  px-3 ${isActive('/admin/notification')}`}>
        <Link className="fa-solid fa-bell nav-link" to="/admin/notification"></Link>
      </li>:
      <li className={`nav-item  px-3 ${isActive('/notification')}`}>
        {/* <Link className="fa-solid fa-bell nav-link" to="/notification"></Link> */}
      </li>
      }
      
      <li className="nav-item active ">
        <Link className="nav-link pb-1">
          {isAdmin ? adminName :userName}</Link>
      </li>
      <ProfileIcon isAdmin={isAdmin} />
            {/* <li className="nav-item dropdown">
        <Link className="nav-link p-0" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <img src={`${config.SERVER_URL}/images/profile/${isAdmin?'avatar': auth?.user?.avatar}.jpg`} className="rounded-circle z-depth-0"
            alt="profile" height="35" />
        </Link>
        <div className="dropdown-menu dropdown-menu-right dropdown-default"
          aria-labelledby="navbarDropdownMenuLink-333">
            {
              !isAdmin &&<Link className="dropdown-item" to={`/profile/${auth.user?._id}`}>View Profile</Link>
            }
          <Link onClick={()=>dispatch(logout())} className="dropdown-item">Log Out</Link>
        </div>
      </li> */}
    </ul>
  </div>
</nav>
</div>
  <nav className='d-flex justify-content-between mx-3 mt-2 mobile-headder'>
    <Link className="mobile-brand h4" to={'/'}>SocialApp</Link>
      <div className={`d-flex`}>
        <a className="fa-solid active fa-magnifying-glass nav-lens" 
          onClick={e=>{
            setSearchOrNot(val=>!val)
          }}
        ></a>
      <ProfileIcon  isAdmin={isAdmin}/>
      </div> 
  </nav>
  {/* search modal */}
    {searchOrNot && <SearchModel setSearchOrNot={setSearchOrNot} /> }  
</>
  )
}

export default Header