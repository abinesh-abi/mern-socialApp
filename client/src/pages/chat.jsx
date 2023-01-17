import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import '../styles/chat.css'
import ChatHome from '../components/Chat/ChatHome';
import Sidebar from '../components/Sidebar';
import VideoCall from '../components/Chat/videoCall/VideoCall';
import { CHAT_TYPES} from '../redux/actions/chatAction';
import ChatHomeMobile from '../components/Chat/ChatHomeMobile';

function Chat() {
  const {chat,socket} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
  
  socket?.socket?.current?.on('callRejected',({val})=>{
    alert('Video call Rejected')
      dispatch({
        type:CHAT_TYPES.IS_VIDEO_CALL,
        payload:{isVideoCall:false}
      })
  })


  },[socket.socket.current])
  return (

    <>
    {
    chat.isVideoCall &&
      <VideoCall />
    }
    {
      !chat.isRecevedCall && !chat.isVideoCall &&
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-7 mt-3 rounded " >
        <div className='chatDesktop'>
          <ChatHome />
        </div>
        <div className='chatMobile'>
          <ChatHomeMobile />
        </div>
        
      </div>

    </div>
    }
    </>
  )
}

export default Chat