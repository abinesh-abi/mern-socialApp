import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'


function ReceveCall() {
const [ownVideo, setOwnVideo] = useState(null)
const [myPeerId, setMyPeerId] = useState('')
const [call, setCall] = useState(null)
let { chat , auth} =useSelector(state=>state)

let myVideo = useRef()
let userVideo = useRef()
let myPeerRef = useRef(
   new Peer(auth.user._id,{
    host: config.PEER_JS_URL,
    port:config.PEER_JS_PORT
  }))

// useEffect(()=>{
//   if (call) {
//     console.log(call,'call++++++')
//   }
// },[call])

useEffect(()=>{
  chat.socket.on('calls',()=>{
    console.log('call get++++++++++++')
    myPeerRef.current.on('call',(call)=>{
      console.log(call,'calll Peer+++++')
    })
  })
    myPeerRef.current.on('call',(call)=>{
      console.log(call,'calll Peer2+++++')
    })
})
console.log(myPeerRef.current,'perrref--------')

// useEffect(()=>{
//   navigator.mediaDevices.getUserMedia({video:true})
//   .then(stream=>{
//     setOwnVideo(stream)
//     myVideo.current.srcObject=stream
    
//   })
  
// },[])

  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />

    <button>accept</button>
    </div>
  )
}

export default ReceveCall