import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { CHAT_TYPES, getCurretChat } from '../../redux/actions/chatAction'
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
    function exitChat() {
        dispatch(getCurretChat({chatDetails:null}))
    }
  return (
<div className="chat-header clearfix">
    <div className="d-flex">
        <i class="fa-solid fa-arrow-left my-auto h5" onClick={exitChat}></i>
        <div className="col-lg-6">
            <Link  data-toggle="modal" >
                <img src={chat?.otherUser?.avatar} alt="avatar" />
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
    {/* <div className='my-auto mr-4'>
           <i className="fa-solid fa-video" onClick={videoCall}></i>
    </div> */}
    </div>
        </div>
  )
}

export default ChatContentHedder