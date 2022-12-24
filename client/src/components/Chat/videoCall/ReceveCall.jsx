import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import Peer from 'peerjs'
import config from '../../../utils/config'
import { useSelector } from 'react-redux'


function ReceveCall() {
const [ownVideo, setOwnVideo] = useState(null)
const [myPeerId, setMyPeerId] = useState('')
let { chat , auth} =useSelector(state=>state)

let myVideo = useRef()
let userVideo = useRef()
let myPeerRef = useRef()
useEffect(()=>{
  const myPeer = new Peer(auth.user._id,{
    host: config.PEER_JS_URL,
    port:config.PEER_JS_PORT
  })

  myPeer.on('open',(id)=>{
    setMyPeerId(id)
    console.log(id,'own')
  })

  // navigator.mediaDevices.getUserMedia({video:true})
  // .then(stream=>{
  //   setOwnVideo(stream)
  //   myVideo.current.srcObject=stream
  myPeerRef.current = myPeer
  // chat.socket.emit('sendCall',{othterUserId:chat.otherUser._id,stream,peerId:myPeerId})
  // })


  myPeer.on('call', function(call) {
    console.log('asdfasdf')
    // call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
      console.log(remoteStream,'remote Stream ++++++++')
      userVideo.current.srcObject = remoteStream
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });

},[])

// useEffect(()=>{
//   navigator.mediaDevices.getUserMedia({video:true})
//   .then(stream=>{
//     setOwnVideo(stream)
//     myVideo.current.srcObject=stream
    
//   })
  
// },[])

function acceptCall() {
  myPeerRef.current.call(chat.otherStream,ownVideo)
}
  return (
    <div >
    <VideoPlayer myVideo={myVideo} userVideo={userVideo} />

    <button>accept</button>
    </div>
  )
}

export default ReceveCall