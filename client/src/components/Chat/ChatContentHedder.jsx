import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

function ChatContentHedder({otherUser,onlineUsers}) {
    const [isOnline, setIsOnline] = useState(false)
    useEffect(()=>{
        let online = onlineUsers.includes(otherUser._id)
        if(online) setIsOnline(true)
    })
  return (
<div className="chat-header clearfix">
    <div className="row">
        <div className="col-lg-6">
            <Link  data-toggle="modal" >
                <img src={`http://127.0.0.1:5000/images/profile/${otherUser?.avatar}.jpg`} alt="avatar" />
            </Link>
            <div className="chat-about">
                <h6 className="m-b-0">{otherUser?.fullname}</h6>
                {
                   isOnline ? <small className='text-success'>Online</small>
                   :
                    <small className='text-secondary'>{format(otherUser?.updatedAt)}</small>
                }
            </div>
        </div>
    </div>
        </div>
  )
}

export default ChatContentHedder