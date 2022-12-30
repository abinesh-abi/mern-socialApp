import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'


function ReceveCall() {
let { chat , auth, socket} =useSelector(state=>state)

let myVideo = useRef()
let userVideo = useRef()

useEffect(()=>{
  const peer =  new Peer(auth.user._id,{
    host: config.PEER_JS_URL,
    port:config.PEER_JS_PORT
  })
  
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video:{ width: 1440, height: 720 }},ownStream=>{
      myVideo.current.srcObject = ownStream
      // send caller to call accepted
      socket.socket.current.emit('callAccepted',{otherUserId:chat.otherStream})
      peer.on('call',(call)=>{
       call.answer(ownStream)
       call.on('stream',(remotStream)=>{
           userVideo.current.srcObject = remotStream
           userVideo.current.play()
      })
  })
})

},[])



  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />
    </div>
  )
}

export default ReceveCall