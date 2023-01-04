import React from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import ReportComponent from '../../components/admin/ReportComponent'

function Reports() {
  return (
    <div className="row justify-content-center">
      <div className="col-11 col-md-3 rounded" >
        <AdminSidebar />
      </div>
      <div className="col-12 col-md-7 mt-3 rounded "style={{overflowY:"scroll",height:'89vh'}}>
          <ReportComponent />
      </div>
    </div>
  )
}

export default Reports