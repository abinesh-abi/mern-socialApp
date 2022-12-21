import React from 'react'

function VideoPlayer({myVideo ,userVideo}) {
  return (
    <div>
      <video ref={myVideo} id="myVideo" width="300" height='200' controls></video>
      <video ref={userVideo} id='userVideo' width="300" height='200' controls></video>
    </div>
  )
}

export default VideoPlayer