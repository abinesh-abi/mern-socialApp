import React, { useEffect, useState } from 'react'

function VideoPlayer({myVideo ,userVideo}) {
  // const [isMyVideoPause, setIsMyVideoPause] = useState(false)
  // const [isUserVideoPause, setisUserVideoPause] = useState(false)

  const [video, setVideo] = useState(true)
  const [audio, setAudio] = useState(true)


  // useEffect(() => {
  //   isMyVideoPause ? 
  //     myVideo.current.pause()
  //   :
  //     myVideo.current.play()
  // },[isMyVideoPause])

  // useEffect(() => {
  //   isUserVideoPause ? 
  //     userVideo.current.pause()
  //   :
  //     userVideo.current.play()
  // },[isUserVideoPause])


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
         onClick={()=>setVideo((val)=>!val)}
        >
          {
            video ?
                <i className="fa-solid fa-video-slash"></i>
              :
                <i className="fa-solid fa-video"></i>
          }
        </div>

        <div className='rounded-circle call-hangup-div bg-danger d-flex justify-content-center align-items-center'>
          <i className="fa-solid fa-phone-slash text-white "></i>
        </div>

        <div className='audio-action-div d-flex justify-content-center align-items-center'
         onClick={()=>setAudio((val)=>!val)}
        >
          {
            audio ?
                <i className="fa-solid fa-microphone-slash"></i>
              :
                <i className="fa-solid fa-microphone"></i>
          }
        </div>
      </div>
    </div>
  </>
  )
}

export default VideoPlayer