
import React from 'react'
import Followers from '../../components/Followers'
import ViewPosts from '../../components/home/ViewPosts'
import Sidebar from '../../components/Sidebar'

function Post(){
  return (
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-2 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-6 mt-3 rounded "style={{overflowY:"scroll",height:'89vh'}}>
        <ViewPosts />
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 mt-3  rounded" >
      <Followers />
      <Followers />
      </div>
    </div>
  )
}

export default Post