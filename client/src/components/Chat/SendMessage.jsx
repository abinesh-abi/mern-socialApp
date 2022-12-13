import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { postDataAPI } from '../../utils/fetchData'

function SendMessage({currentChat,updateMsg}) {
    const { auth} =  useSelector(state=>state)
    const [newMessage, setNewMessage] = useState('')
    function submit(e) {
        e.preventDefault()
        if (!newMessage.trim()) return 
        postDataAPI('/user/chat/message/new',{ChatId:currentChat?._id,sender:auth.user._id,text:newMessage},auth.token)
        .then(({data})=>{
            updateMsg()
            setNewMessage('')
        })
    }

  return (
    <div className="chat-message clearfix">
        <form onSubmit={submit}>
            <div className="input-group mb-0">
                <input onChange={e=>setNewMessage(e.target.value)} value={newMessage} type="text" className="form-control" placeholder="Enter text here..." />                                    
                <div className="input-group-prepend">
                    <button type='submit' className="input-group-text"><i className="fa fa-paper-plane text-primary"></i></button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SendMessage