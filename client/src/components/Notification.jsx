import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDataAPI, getDataAPI } from '../utils/fetchData'
import ImageRounded from './ImageRounded'
import '../styles/notification.css'

function Notification() {
  const {auth} = useSelector(state=>state)
  const [notifications, setNotifications] = useState([])

  function getNotification() {
    getDataAPI('/user/notification/get',auth.token)
    .then(({data})=>{
      setNotifications(data.data)
    })
  }

  function removeNotification(id) {
    deleteDataAPI(`/user/notification/delete/${id}`,auth.token)
    .then(({data})=>{
      getNotification()
    })
  }

  useEffect(()=>{
    if(auth.token) getNotification()
  },[auth.token])
  return (
    <>
    {
      !notifications.length ?
      <div className='mt-5 text-center'>
        <h5>There is no notificaton to display</h5>
      </div>
      :
    notifications?.map((values,index)=>{
    return <div key={index} style={{position:'relative'}} id='notification-Item'>
    

    <div className='card'>
        <div className='d-flex'>
          <div className='ml-4 my-2 d-flex'>
            <div className="my-auto">
              <ImageRounded size='55' />
            </div>
          </div>
          <div className='mt-2 ml-3 '>
            <div className="d-flex ">
              <p className='mx-1 h6 my-auto'>{values.userDetail[0].fullname}</p>
              <span className='my-auto'>{values.type} you</span>
            </div>
            <div>
              <p>{values.content}</p>
            </div>
          </div>
          <div className='ml-auto mr-3'>
            <p >3d</p>
              {/* <div className='bg-success' style={{width:'15px',height:'15px',borderRadius:'50%'}}></div>  */}
            
          </div>
        </div>
    </div>

    <button id='notification-dropdown' className="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false" style={{position:"absolute",top: '20px',right: '50px'}} >
        <em className="fa fa-ellipsis-h"></em>
    </button>
    <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style={{transform: 'translate3d(-136px, 28px, 0px)', top: "0px", left: "0px", "willChange": "transform"}}>
              {/* <Link className="dropdown-item"  >Mark as Read</Link>  */}
              <Link className="dropdown-item" onClick={()=>removeNotification(values._id)}>Remove</Link>
    </div>
    </div>
    })
    }
    </>
  )
}

export default Notification