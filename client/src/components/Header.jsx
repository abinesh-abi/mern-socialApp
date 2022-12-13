import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, } from 'react-router-dom'
import { logout } from '../redux/actions/authAction'
import SearchModel from './SearchModel'
import '../../src/styles/seacrchModel.css'

function Header() {
  const {auth,adminAuth} = useSelector(state=>state)



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
    <div className='w-100' style={{position:'fixed',zIndex:'1'}}>
<nav className="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 " >
  <Link className="navbar-brand" to={'/'}>SocialApp</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
    aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
    <ul className="navbar-nav ml-auto nav-flex-icons">
      <li className={`nav-item  px-2`}>
        {/* <div className="input-group ">
          <div className="form-outline ">
            <input type="search" defaultValue={serch} id="form1" className="form-control"
              onChange={e=>setSerch(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary"
            onClick={serchUser}
          >
            <i className="fas fa-search"></i>
          </button>
        </div> */}
        {/* <a className="fa-solid nav-link active fa-magnifying-glass" href='#search'></a> */}
        <a className="fa-solid nav-link active fa-magnifying-glass" 
          onClick={e=>{
            let sercModel = document.getElementById('search')
            sercModel.style.visibility = 'visible'
            sercModel.style.opacity = '1'
          }}
        ></a>
        {/* <Link className="fa-solid nav-link active fa-magnifying-glass" data-toggle="modal" data-target="#search"></Link>
        <div className="">
          <a href="#search">Open Demo Modal</a>
        </div> */}
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
            <li className="nav-item dropdown">
        <Link className="nav-link p-0" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <img src={`http://127.0.0.1:5000/images/profile/${isAdmin?'avatar': auth?.user?.avatar}.jpg`} className="rounded-circle z-depth-0"
            alt="profile" height="35" />
        </Link>
        <div className="dropdown-menu dropdown-menu-right dropdown-default"
          aria-labelledby="navbarDropdownMenuLink-333">
            {
              !isAdmin &&<Link className="dropdown-item" to={`/profile/${auth.user?._id}`}>View Profile</Link>
            }
          <Link onClick={()=>dispatch(logout())} className="dropdown-item">Log Out</Link>
        </div>
      </li>
    </ul>
  </div>

      {/* model */}
      <SearchModel />
      

  {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button onClick={clearSearch} type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" >&times;</span>
        </button>
      </div>

        <div className=" m-3 justify-content-center">
          <div className="card  p-4">
              <form onSubmit={serchUser}>
                <div className="input-group mb-1">
                  <input type="text" className="form-control"
                  defaultValue={serch}
                    onChange={e=>setSerch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            <div className="mb-3">
              <p className='mx-auto text-danger'>{serchErr}</p>
              {
                userList.map((value,index)=>{
                   return <div onClick={()=>viewProfile(value._id)}  key={index} className=" d-flex justify-content-between shadow-sm px-3 mx-1" style={listDiv}
                   >
                        <div className='d-flex'>
                            <img
                            className="img-fluid"
                            src={`http://127.0.0.1:5000/images/profile/${value?.avatar}.jpg`}
                            style={listImage}
                            alt=""
                            />
                            <p className='mx-3' style={{'lineHeight': '45px',}}>{value.fullname}</p>
                        </div>
                    </div>
                })
              }
            </div>
            
          </div>	
        </div>
    </div>
  </div>
</div> */}
</nav>
</div>
</>
  )
}

export default Header