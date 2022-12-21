import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Options from './Options'
import VideoPlayer from './VideoPlayer'
import Peer from 'simple-peer'

function ReceveCall() {
    const [stream, setStream] = useState(null)
    const [call, setCall] = useState({});
    const [isOtherUserOnline, setisOtherUserOnline] = useState(false)
    let peer =useRef()

    const { chat} =  useSelector(state=>state)

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream)=>{
            setStream(currentStream)
            myVideo.current.srcObject = currentStream;
        })

        peer.current = new Peer({initiator:true,trickle: false, stream})
        // const userOnline = chat.onlineUsers.includes(chat?.otherUser?._id)
        // setisOtherUserOnline(userOnline)

        // if (userOnline) {
        //   console.log(chat.socket)
        //   chat?.socket?.emit('sendCall',{othterUserId:chat.otherUser._id,stream:chat.currentStream})
        // }

        
    //     chat?.socket?.current?.on('callUser', ({ from, name: callerName, signal }) => {
    //       setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });
    },[])

    // useEffect(()=>{
    //   if (!peer.current) return
    //   peer.current.on('stream', (currentStream) => {
    //     console.log('currentStream','hi+++++++++++++++')
    //    userVideo.current.srcObject = currentStream;
    //   });

    //   peer.current.signal(chat.otherStream)
    //   connectionRef.current = peer.current
    // },[])

    function accept() {
      peer.current.on('stream', (currentStream) => {
        console.log('currentStream','hi+++++++++++++++')
       userVideo.current.srcObject = currentStream;
      });

      peer.current.signal(chat.otherStream)
      connectionRef.current = peer.current
      
    }

  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />
    <Options />

    <button onClick={accept}>accept</button>
    </div>
  )
}

export default ReceveCall