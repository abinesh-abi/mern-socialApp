import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/authAction'
import config from '../../utils/config'

function ProfileIcon({isAdmin}) {
const {auth,} = useSelector(state=>state)
  let dispatch = useDispatch()
  return (
        <div className="nav-item dropdown">
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
      </div>
  )
}

export default ProfileIcon