import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Sidebar() {
  const {auth} = useSelector(state=>state)
  return (
    <>
    {/* <div className=" rounded shadow mt-3 h-100 d-flex flex-column" style={{background:'#868B8E'}}> */}
    <div className="card  shadow mt-3 h-100 d-flex flex-column" style={{background:'#868B8E'}}>
      <div className='mt-5 d-flex flex-column' style={{background:'#868B8E'}}>
          <Link className="px-4 my-1 py-3 text-white shadow-sm" to={'/'}>Home</Link>
          <Link className="px-4 my-1 py-3 text-white shadow-sm" to={`/profile/${auth?.user?._id}`}>Profile</Link>
          <Link className="px-4 my-1 py-3 text-white shadow-sm" to={'/message'}>Message</Link>
          <Link className="px-4 my-1 py-3 text-white shadow-sm"to={'/notification'}>Notification</Link>
        {/* <div className="px-4 my-1 py-3  shadow-sm">
          <Link to={'/'}>Home</Link>
        </div>
        <div className="px-4 my-1 py-3  shadow-sm">
          <Link>Messages</Link>
        </div>
        <div className="px-4 my-1 py-3  shadow-sm">
          <Link>Notification</Link>
        </div> */}
    </div>
    </div>

      {/* <div className=" rounded shadow mt-3">
        <div className="px-4 my-1 py-1 border shadow-sm">
          <Link to={'/'}>Home</Link>
        </div>
        <div className="px-4 my-1 py-1 border shadow-sm">
          <Link>Messages</Link>
        </div>
        <div className="px-4 my-1 py-1 border shadow-sm">
          <Link>Notification</Link>
        </div>
      </div>  */}
    </>
  )
}

export default Sidebar