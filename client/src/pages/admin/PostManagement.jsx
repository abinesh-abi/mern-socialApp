import React from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import PostComponent from '../../components/admin/PostComponent'

function PostManagement() {
  return (
    <div className="row justify-content-center">
      <div className="col-11 col-md-3 rounded" >
        <AdminSidebar />
      </div>
      <div className="col-12 col-md-7 mt-3 rounded "style={{overflowY:"scroll",height:'89vh'}}>
        <PostComponent />
      </div>
    </div>
  )
}

export default PostManagement