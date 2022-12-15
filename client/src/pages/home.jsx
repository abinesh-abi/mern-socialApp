import React from 'react'
import Followers from '../components/Followers'
import FollowRequest from '../components/FollowRequest'
import HomeBody from '../components/home/HomeBody'
import Sidebar from '../components/Sidebar'

function Home(){
  return (
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-4 mt-3 rounded "style={{overflowY:"scroll",height:'89vh'}}>
          <HomeBody /> 
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 mt-3  rounded" >
      <Followers />
      <FollowRequest />
      </div>
    </div>
  )
}

export default Home