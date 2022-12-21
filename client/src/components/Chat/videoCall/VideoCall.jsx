import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Options from './Options'
import VideoPlayer from './VideoPlayer'
import Peer from 'simple-peer'

function VideoCall() {
    const { chat} =  useSelector(state=>state)

    const [stream, setStream] = useState(null)
    const [call, setCall] = useState({});
    const [isOtherUserOnline, setisOtherUserOnline] = useState(false)
    const [callAccepted, setCallAccepted] = useState(false);

    

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(()=>{
      const peer = new Peer({initiator:true,trickle: false, stream})
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream)=>{
            setStream(currentStream)
            myVideo.current.srcObject = currentStream;
        const userOnline = chat.onlineUsers.includes(chat?.otherUser?._id)
        setisOtherUserOnline(userOnline)

        peer.on('signal',(data)=>{
          console.log(data,'sdfawer++++++++++++')
          chat?.socket?.emit('sendCall',{othterUserId:chat.otherUser._id,stream:data})
        })

        // if (userOnline && stream) {
        //   chat?.socket?.emit('sendCall',{othterUserId:chat.otherUser._id,stream:currentStream})
        // }
        })

        
    //     chat?.socket?.current?.on('callUser', ({ from, name: callerName, signal }) => {
    //       setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });
    connectionRef.current = peer
    },[])

    // useEffect(()=>{
    //   userVideo.current.srcObject = chat?.otherStream

    // },[])


    function reqestCall() {

    }

// answer call
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      chat?.socket?.current?.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  // call user
   const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      chat?.socket?.emit('callUser', { userToCall: id, signalData: data, from: call.socketId, name:'abi121132' });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    chat?.socket?.current?.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />
    <Options />
    </div>
  )
}

export default VideoCall