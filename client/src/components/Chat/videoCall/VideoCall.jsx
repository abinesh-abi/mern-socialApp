import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'

function VideoCall() {
let { chat ,auth,socket } =useSelector(state=>state)

let myVideo = useRef()
let userVideo = useRef()

useEffect(()=>{
  // send call reqest
  socket.socket.current.emit('sendCall',{othterUserId:chat.otherUser._id,ownId:auth.user._id})

  // // if call accepted
  socket.socket.current.on('callAcepeddddd',({val})=>{

  navigator.mediaDevices.getUserMedia({video:{ width: 1440, height: 720 }})
    .then(stream=>{
       myVideo.current.srcObject=stream
      const peer = new Peer(auth.user._id,{
         host: config.PEER_JS_URL,
         port:config.PEER_JS_PORT
      })
      var call = peer.call(chat.otherUser._id, stream);
      call.on('stream',(remotStreame)=>{
        userVideo.current.srcObject = remotStreame
      },function(err) {
      console.log('Failed to get local stream' ,err);
      })
    })
    .catch(err=>console.log(err,'err____-----'))
  })


},[])

  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />
    </div>
  )
}

export default VideoCall