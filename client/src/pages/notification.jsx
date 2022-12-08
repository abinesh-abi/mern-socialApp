
import React from 'react'
import Notification from '../components/Notification'
import Followers from './../components/Followers'
import ViewPosts from './../components/home/ViewPosts'
import Sidebar from './../components/Sidebar'

function Post(){
  return (
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-4 mt-3 rounded "style={{overflowY:"scroll",height:'89vh'}}>
      <Notification />
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 mt-3  rounded" >
      <Followers />
      {/* <Followers /> */}
      </div>
    </div>
  )
}

export default Post