import React from 'react'
import { useSelector } from 'react-redux'
import {format} from 'timeago.js'
import config from '../../utils/config'

function Messages({self,message}) {
  const { auth , chat} =  useSelector(state=>state)
  return (
    self ?
    <li className="clearfix">
        <div className="message-data text-right">
            <span className="message-data-time">{format(message.createdAt)}</span>
            <img src={`${config.SERVER_URL}/images/profile/${auth?.user?.avatar}.jpg`} alt="avatar" />
        </div>
        <div className="message other-message float-right">{message.text}</div>
    </li>
    :
    <li className="clearfix">
        <div className="message-data">
            <img src={`${config.SERVER_URL}/images/profile/${chat.otherUser?.avatar}.jpg`} alt="avatar" />
            <span className="message-data-time">{format(message?.createdAt)}</span>
        </div>
        <div className="message my-message">{message?.text}</div>                                    
    </li>
  )
}

export default Messages