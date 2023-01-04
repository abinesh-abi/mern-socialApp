import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import '../styles/chat.css'
import Sidebar from '../components/Sidebar';
import Friends from '../components/friends/FriendsLarge';

function Chat() {
  const {chat} = useSelector(state=>state)
  const dispatch = useDispatch()
  return (
    <>
    <div className="row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3 rounded" >
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-7 mt-3 rounded " >
        <Friends />
        
      </div>

    </div>
    </>
  )
}

export default Chat