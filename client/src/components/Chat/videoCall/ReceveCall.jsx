import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'
import '../../../styles/chat.css'


function ReceveCall() {
let { chat , auth, socket} =useSelector(state=>state)

const [currStream, setCurrStream] = useState(null)
const [peer, setPeer] = useState(null)

let myVideo = useRef()
let userVideo = useRef()

useEffect(()=>{
  navigator.mediaDevices.getUserMedia({video:{ width: 1440, height: 720 },audio:true})
    .then(stream=>{
       setCurrStream(stream)
        const newPeer =  new Peer(auth.user._id,{
          host: config.PEER_JS_URL,
          port:config.PEER_JS_PORT,
          secure:true
        })
        setPeer(newPeer)
        // send caller to call accepted
        socket.socket.current.emit('callAccepted',{otherUserId:chat.otherStream})
    })
    .catch(err=>console.log(err,'err____-----'))

},[])


useEffect(()=>{
  if (peer && currStream) {
      myVideo.current.srcObject = currStream
      peer.on('call',(call)=>{
      call.answer(currStream)
      call.on('stream',(remotStream)=>{
          userVideo.current.srcObject = remotStream
      })
      })
  }

},[peer])


  return (
    <div >
    {/* <VideoPlayer myVideo={myVideo} userVideo={userVideo} /> */}
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} stream={currStream} setCurrStream={setCurrStream}/>

    </div>
  )
}

export default ReceveCall