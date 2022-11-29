import React from 'react'
import FriendsList from '../components/FriendsList'
import HomeBody from '../components/home/HomeBody'
import Sidebar from '../components/Sidebar'

function Home(){
  return (
    <div className="container-fluid row justify-content-center ">
      {/* side bar */}
      <div className="col-11 col-md-2 rounded ">
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-6 mt-3 rounded">
     <HomeBody /> 
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 mt-3  rounded" >
      <FriendsList />
      </div>
    </div>
  )
}

export default Home