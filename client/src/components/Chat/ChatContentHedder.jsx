import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { CHAT_TYPES } from '../../redux/actions/chatAction'
import config from '../../utils/config'

function ChatContentHedder({}) {
    const [isOnline, setIsOnline] = useState(false)
  const {chat} =  useSelector(state=>state)
  const dispatch = useDispatch()
    useEffect(()=>{
        let online = chat?.onlineUsers?.includes(chat?.otherUser?._id)
        if(online) setIsOnline(true)
    })
    function videoCall() {
        dispatch({
            type:CHAT_TYPES.IS_VIDEO_CALL,
            payload:{
                isVideoCall:true
            }
        })
    }
  return (
<div className="chat-header clearfix">
    <div className="row">
        <div className="col-lg-6">
            <Link  data-toggle="modal" >
                <img src={`${config.SERVER_URL}/images/profile/${chat?.otherUser?.avatar}.jpg`} alt="avatar" />
            </Link>
            <div className="chat-about">
                <h6 className="m-b-0">{chat?.otherUser?.fullname}</h6>
                {
                   isOnline ? <small className='text-success'>Online</small>
                   :
                    <small className='text-secondary'>{format(chat?.otherUser?.updatedAt)}</small>
                }
            </div>
        </div>
    <div>
           <i className="fa-solid fa-video" onClick={videoCall}></i>
    </div>
    </div>
        </div>
  )
}

export default ChatContentHedder