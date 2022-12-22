import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import '../styles/chat.css'
import ChatHome from '../components/Chat/ChatHome';
import Sidebar from '../components/Sidebar';

function Chat() {

  return (
    <>
        
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-7 mt-3 rounded " >
        <ChatHome />
        
      </div>

    </div>
    </>
  )
}

export default Chat