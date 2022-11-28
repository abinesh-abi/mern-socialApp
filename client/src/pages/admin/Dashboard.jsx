import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {

  return (
    <div className="container-fluid row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-2 rounded">
    <div className=" card  shadow mt-3 h-100 d-flex flex-column" style={{background:'#868B8E'}}>
      <div className='mt-5 d-flex flex-column ' style={{background:'#868B8E'}}>
          <Link className="px-4 my-1 py-3 text-white shadow-sm" to={'/admin'}>Dashboard</Link>
          <Link className="px-4 my-1 py-3 text-white shadow-sm" to={'/admin/message'}>Users</Link>
    </div>
    </div>
      </div>
      {/* body */}
      <div className="col-12 col-md-6 mt-3 bg-white rounded">
     {/* <HomeBody />  */}
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 mt-3  rounded" >
      {/* <FriendsList /> */}
      </div>
    </div>
  )
}

export default Dashboard