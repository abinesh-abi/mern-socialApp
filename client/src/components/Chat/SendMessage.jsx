import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages } from '../../redux/actions/chatAction'
import { postDataAPI } from '../../utils/fetchData'

function SendMessage() {
    const { auth , chat,socket} =  useSelector(state=>state)
    const [newMessage, setNewMessage] = useState('')
    const dispatch = useDispatch()
    function submit(e) {
        e.preventDefault()
        if (!newMessage.trim()) return 
        postDataAPI('/user/chat/message/new',{ChatId:chat?.currentChat?._id,sender:auth.user._id,text:newMessage},auth.token)
        .then(({data})=>{
            dispatch(fetchMessages({id:chat?.currentChat._id,auth}))
            setNewMessage('')
            const receiverId = chat?.currentChat.members.find(
                member =>member !== auth.user._id
            )
            socket?.socket?.current.emit('sendMessage',{
                senderId:auth?.user?._id,
                receiverId:receiverId,
                text:newMessage
            })
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