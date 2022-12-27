import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'

function VideoCall() {
const [ownVideo, setOwnVideo] = useState(null)
const [myPeerId, setMyPeerId] = useState('')
let { chat ,auth } =useSelector(state=>state)

let myVideo = useRef()
let userVideo = useRef()

let myPeerRef = useRef(new Peer(auth.user._id,{
    host: config.PEER_JS_URL,
    port:config.PEER_JS_PORT
  })
)

// useEffect(()=>{
//   navigator.mediaDevices.getUserMedia({video:true})
//   .then(stream=>{
//     myVideo.current.srcObject=stream
//    console.log(chat.otherUser._id,'id------')
// //    call.on('stream',(remotStreame)=>{
// //     console.log(remotStreame,'stre')
// //     userVideo.current.srcObject = remotStreame
// //    },function(err) {
// //   console.log('Failed to get local stream' ,err);
// // })
//   })
//   .catch(err=>console.log(err,'err____-----'))
// },[])
useEffect(()=>{
  chat.socket.emit('sendCall',{othterUserId:chat.otherUser._id,peerId:myPeerId})
},[myPeerId])


function sendCall() {
  
  navigator.mediaDevices.getUserMedia({video:true})
  .then(stream=>{
    myVideo.current.srcObject=stream
   chat.socket.emit('calling',{othterUserId:chat.otherUser._id})
   var call = myPeerRef.current.call(chat.otherUser._id, stream);

   call?.on('stream',(remotStreame)=>{
    console.log(remotStreame,'stre')
    userVideo.current.srcObject = remotStreame
   },function(err) {
  console.log('Failed to get local stream' ,err);
})
  })
  .catch(err=>console.log(err,'err____-----'))
}
  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />

    <button onClick={sendCall}>send call</button>
    </div>
  )
}

export default VideoCall