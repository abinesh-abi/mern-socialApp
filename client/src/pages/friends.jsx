import React from 'react'

import '../styles/chat.css'
import Sidebar from '../components/Sidebar';
import Friends from '../components/friends/FriendsLarge';

function Chat() {
  return (
    <>
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-7 mt-3 rounded contents" >
        <Friends />
        
      </div>

    </div>
    </>
  )
}

export default Chat