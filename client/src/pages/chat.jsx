import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import '../styles/chat.css'
import ChatHome from '../components/Chat/ChatHome';
import Sidebar from '../components/Sidebar';
import VideoCall from '../components/Chat/videoCall/VideoCall';
import { CHAT_TYPES} from '../redux/actions/chatAction';
import ReceveCall from '../components/Chat/videoCall/ReceveCall';

function Chat() {
  const {chat,socket} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
    
    // notify call and accept
  //   socket?.socket?.current?.on('callNotify',({peerId})=>{
  //   let confirmed = window.confirm('Accept Call')
  //   if (confirmed) {
  //     dispatch({
  //       type:CHAT_TYPES.OTHERS_STREAM,
  //       payload:{otherStream:peerId}
  //     })
  //     dispatch({
  //       type:CHAT_TYPES.IS_RECEVED_CALL,
  //       payload:{isRecevedCall:true}
  //     })
  //   }else{
  //     socket?.socket?.current?.emit('rejectCall',{otherUser:peerId})
  //   }
  // })

  
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
    {/* {
    chat.isRecevedCall &&
    <ReceveCall />
    } */}
    {
      !chat.isRecevedCall && !chat.isVideoCall &&
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-7 mt-3 rounded " >
        <ChatHome />
        
      </div>

    </div>
    }
    </>
  )
}

export default Chat