
import React from 'react'
import Community from '../components/Community'
import SavePost from '../components/SavedPosts'
import Sidebar from '../components/Sidebar'

function Home(){
  return (
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-2 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-6 mt-3 rounded "style={{overflowY:"scroll",height:'89vh'}}>
          {/* <HomeBody />  */}
          <SavePost />
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 mt-3  rounded" >
      <Community />
      {/* <Followers /> */}
      </div>
    </div>
  )
}

export default Home