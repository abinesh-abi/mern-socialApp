import React from 'react'
import { useSelector } from 'react-redux'
import {format} from 'timeago.js'

function Messages({self,message,otherUser}) {
  const { auth} =  useSelector(state=>state)
  return (
    self ?
    <li className="clearfix">
        <div className="message-data text-right">
            <span className="message-data-time">{format(message.createdAt)}</span>
            <img src={`http://127.0.0.1:5000/images/profile/${auth?.user?.avatar}.jpg`} alt="avatar" />
        </div>
        <div className="message other-message float-right">{message.text}</div>
    </li>
    :
    <li className="clearfix">
        <div className="message-data">
            <img src={`http://127.0.0.1:5000/images/profile/${otherUser?.avatar}.jpg`} alt="avatar" />
            <span className="message-data-time">{format(message.createdAt)}</span>
        </div>
        <div className="message my-message">{message.text}</div>                                    
    </li>
  )
}

export default Messages