import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EndCall } from '../../../redux/actions/chatAction';

function VideoPlayer({myVideo ,userVideo , stream,setCurrStream}) {

  const [video, setVideo] = useState(true)
  const [audio, setAudio] = useState(true)

  let { chat , auth, socket} =useSelector(state=>state)
  const dispatch = useDispatch()


  function stopVideo() {
      // currStream.getTracks().forEach(track => track.stop())
      stream?.getVideoTracks()[0].stop();
      setVideo(false)
  }

  function stopAudio() {
      // currStream.getTracks().forEach(track => track.stop())
      stream?.getAudioTracks()[0].stop();
      setAudio(false)
  }

function renewStream() {
  navigator.mediaDevices.getUserMedia({video:{ width: 1440, height: 720 },audio:true})
    .then(stream=>{
       setCurrStream(stream)
       setVideo(true)
       setAudio(true)
    })
    .catch(err=>console.log(err,'err____-----'))
}

useEffect(()=>{
  // end call
  if (stream) {
    socket?.socket?.current?.on('callEnded',({val})=>{
      dispatch(EndCall({stream}))
    })
  }
},[])

function endCall() {
  socket.socket.current.emit('endCall',{otherUser:chat?.otherUser?._id || chat?.otherStream})
  dispatch(EndCall({stream}))
}

  return (
    <>
    <div className='video-container d-flex justify-content-center'>

      <div className='full-size-div'>
            <video
            ref={userVideo} id='userVideo' autoPlay
            className='full-size-video mt-3'
            ></video>
      </div>
      <div className='small-size-div'>
          <video
          ref={myVideo} id="myVideo" autoPlay 
          className='small-size-video '
          ></video>
      </div>
      <div className='call-buttons d-flex justify-content-around'>
        <div className='video-action-div d-flex justify-content-center align-items-center'
        onClick={video ? stopVideo : renewStream}
        >
          {
            video ?
                <i className="fa-solid fa-video-slash"
                  onClick={stopVideo}
                ></i>
              :
                <i className="fa-solid fa-video"
                // onClick={renewStream}
                ></i>
          }
        </div>

        <div className='rounded-circle call-hangup-div bg-danger d-flex justify-content-center align-items-center'
          onClick={endCall}
        >
          <i className="fa-solid fa-phone-slash text-white "></i>
        </div>

        <div className='audio-action-div d-flex justify-content-center align-items-center'
        onClick={audio ? stopAudio : renewStream}
        >
          {
            audio ?
                <i className="fa-solid fa-microphone-slash"
                  // onClick={stopAudio}
                ></i>
              :
                <i className="fa-solid fa-microphone"
                  // onClick={renewStream}
                ></i>
          }
        </div>
      </div>
    </div>
  </>
  )
}

export default VideoPlayer