import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'

function VideoCall() {
let { chat ,auth,socket } =useSelector(state=>state)

const [currStream, setCurrStream] = useState(null)

const [peer, setPeer] = useState(null)
let myVideo = useRef()
let userVideo = useRef()

useEffect(()=>{
  // send call reqest
  socket.socket.current.emit('sendCall',{othterUserId:chat.otherUser._id,ownId:auth.user._id})

  // // if call accepted
  socket.socket.current.on('callAcepeddddd',({val})=>{
  navigator.mediaDevices.getUserMedia({video:{ width: 1440, height: 720 },audio:true})
    .then(stream=>{
       setCurrStream(stream)
    })
    .catch(err=>console.log(err,'err____-----'))

  })
  return ()=>{
        currStream?.getAudioTracks()[0]?.stop();
        currStream?.getVideoTracks()[0]?.stop();
  }
},[])

useEffect(()=>{
  if (currStream) {
       myVideo.current.srcObject=currStream
      const newPeer = new Peer(auth.user._id,{
         host: config.PEER_JS_URL,
         port:config.PEER_JS_PORT,
         secure:true
      })
      setPeer(newPeer)
  }
},[currStream])

useEffect(()=>{
  if (peer) {
    const call = peer.call(chat.otherUser._id, currStream);
    call?.on('stream',(remotStreame)=>{
      userVideo.current.srcObject = remotStreame
    },function(err) {
      console.log('Failed to get local stream' ,err);
    })
  }
},[peer])


  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} stream={currStream} setCurrStream={setCurrStream}/>
    </div>
  )
}

export default VideoCall