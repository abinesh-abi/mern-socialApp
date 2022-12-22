import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'

function VideoCall() {
const [ownVideo, setOwnVideo] = useState(null)
const [myPeerId, setMyPeerId] = useState('')
let { chat } =useSelector(state=>state)

let myVideo = useRef()
let userVideo = useRef()

let myPeerRef = useRef()

useEffect(()=>{
  const myPeer = new Peer('',{
    host: config.PEER_JS_URL,
    port:config.PEER_JS_PORT
  })

  myPeer.on('open',(id)=>{
    setMyPeerId(id)
  })

  navigator.mediaDevices.getUserMedia({video:true})
  .then(stream=>{
    setOwnVideo(stream)
    myVideo.current.srcObject=stream
  myPeerRef.current = myPeer
  })
},[])
useEffect(()=>{
  chat.socket.emit('sendCall',{othterUserId:chat.otherUser._id,peerId:myPeerId})
},[myPeerId])
  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />

    <button>accept</button>
    </div>
  )
}

export default VideoCall