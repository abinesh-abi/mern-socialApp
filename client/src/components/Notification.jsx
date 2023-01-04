import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDataAPI, getDataAPI } from '../utils/fetchData'
import ImageRounded from './common/ImageRounded'
import '../styles/notification.css'
import NotificationContent from './profile/NotificationContent'
import config from '../utils/config'

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
  
  // calculate notification time
  function timeDifference(date1 , date2) {
    let diffInMilliSeconds = Math.abs(date1 - date2) / 1000;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60)

    // minutes
    if(minutes < 60) return minutes + ' M'

    // hour
    if(minutes < 24 * 60) return Math.floor(minutes / 60) + ' H'

    // days
    if(minutes < 10 * 60 * 24) return Math.floor(minutes / 60 / 24 ) + ' D'

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
    return <div  key={index} style={{position:'relative'}} id='notification-Item'>

    <div className='card'>
        <div className='d-flex'>
          <div className='ml-4 my-2 d-flex'>
            <div className="my-auto">
            <Link to={`/profile/${values.userId}`} style={{color:'black',textDecoration:'none'}}>
              <ImageRounded size='55' src={`${config.SERVER_URL}/images/profile/${values.userDetail[0].avatar}.jpg`} />
            </Link>
            </div>
          </div>
          {
            values?.type ==='followed' && 
            <Link to={`/profile/${values.viewId}`} style={{color:'black',textDecoration:'none'}}>
              <NotificationContent 
              name={values.userDetail[0].fullname}  
              headContent='followed you'
              content={'This user followed you'}
              />
            </Link>
          }
          {
            values?.type ==='post' && 
            <Link to={`/post/${values.viewId}`} style={{color:'black',textDecoration:'none'}}>
              <NotificationContent 
              name={values.userDetail[0].fullname}  
              headContent='Added new Post'
              content={'This user this user Added new post'}
              />
            </Link>
          }
          {
            values?.type ==='followRequest' && 
            <Link to={`/profile/${values.viewId}`} style={{color:'black',textDecoration:'none'}}>
              <NotificationContent 
              name={values.userDetail[0].fullname}  
              headContent='send follow Request'
              content={'This user this user send A follow Request'}
              />
            </Link>
          }
          <div className='ml-auto mr-3 mt-2'>
            <p >{timeDifference(new Date(Date.now()),new Date(values.createdAt)) }</p>
            {/* <p >3d</p> */}
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