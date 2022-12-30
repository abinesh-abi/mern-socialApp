import React, { useEffect, useState } from 'react'

function VideoPlayer({myVideo ,userVideo , stream,setCurrStream}) {
  // const [isMyVideoPause, setIsMyVideoPause] = useState(false)
  // const [isUserVideoPause, setisUserVideoPause] = useState(false)

  const [video, setVideo] = useState(true)
  const [audio, setAudio] = useState(true)
  const [copyTrack, setCopyTrack] = useState(stream)


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
    })
    .catch(err=>console.log(err,'err____-----'))
    setVideo(true)
    setAudio(true)
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
        >
          {
            video ?
                <i className="fa-solid fa-video-slash"
                  onClick={stopVideo}
                ></i>
              :
                <i className="fa-solid fa-video"
                onClick={renewStream}
                ></i>
          }
        </div>

        <div className='rounded-circle call-hangup-div bg-danger d-flex justify-content-center align-items-center'>
          <i className="fa-solid fa-phone-slash text-white "></i>
        </div>

        <div className='audio-action-div d-flex justify-content-center align-items-center'
        >
          {
            audio ?
                <i className="fa-solid fa-microphone-slash"
                  onClick={stopAudio}
                ></i>
              :
                <i className="fa-solid fa-microphone"
                  onClick={renewStream}
                ></i>
          }
        </div>
      </div>
    </div>
  </>
  )
}

export default VideoPlayer