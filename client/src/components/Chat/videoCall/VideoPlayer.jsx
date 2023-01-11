import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EndCall } from '../../../redux/actions/chatAction';

function VideoPlayer({myVideo ,userVideo , stream }) {

  const [video, setVideo] = useState(true)
  const [audio, setAudio] = useState(true)

  let { chat , socket} =useSelector(state=>state)
  const dispatch = useDispatch()


  function stopVideo() {
      const videoStreame = stream?.getVideoTracks()[0]
      videoStreame.enabled = false;
      setVideo(false)
  }

  function stopAudio() {
      const audioStram = stream?.getAudioTracks()[0]
      audioStram.enabled = false
      setAudio(false)
  }

function renewVideo() {
  const videoStreame = stream?.getVideoTracks()[0]
    videoStreame.enabled = true;
    setVideo(true)
}

function renewAudio() {
    const audioStram = stream?.getAudioTracks()[0]
    audioStram.enabled = true;
    setAudio(true)
}

useEffect(()=>{
  // end call
  if (stream) {
    socket?.socket?.current?.on('callEnded',({val})=>{
      dispatch(EndCall({stream}))
    })
  }
},[stream])

function endCall() {
  dispatch(EndCall({stream}))
  socket.socket.current.emit('endCall',{otherUser:chat?.otherUser?._id || chat?.otherStream})
}

  return (
    <>
    <div className='video-container d-flex justify-content-center'>

      <div className='full-size-div'>
            <video
            ref={userVideo} id='userVideo' autoPlay loop
            className='full-size-video mt-3'
            src='../images/loding_user_video.mp4'
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
        onClick={video ? stopVideo : renewVideo}
        >
          {
            video ?
                <i className="fa-solid fa-video-slash"
                  onClick={stopVideo}
                ></i>
              :
                <i className="fa-solid fa-video"
                ></i>
          }
        </div>

        <div className='rounded-circle call-hangup-div bg-danger d-flex justify-content-center align-items-center'
          onClick={endCall}
        >
          <i className="fa-solid fa-phone-slash text-white "></i>
        </div>

        <div className='audio-action-div d-flex justify-content-center align-items-center'
        onClick={audio ? stopAudio : renewAudio}
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