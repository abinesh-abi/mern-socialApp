import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import ChatContentHedder from './ChatContentHedder'
import Messages from './Messages'
import SendMessage from './SendMessage'

function ChatContent({currentChat,socket}) {
    const [messages, setMessages] = useState([])
    const {auth} =  useSelector(state=>state)
    const scrollRef = useRef()
    
    function getMessages() {
        getDataAPI(`/user/chat/message/getChat/${currentChat?._id}`,auth.token)
        .then(({data})=>setMessages(data.data))
    }
    useEffect(()=>{
       auth.token && getMessages()
    },[auth?.token])

    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior:'smooth'})
    },[messages])

    useEffect(()=>{
        socket.on('message recieved',(data=>{
            console.log(data)
        }))
    })


  return (
    currentChat ?
    <div className="chat">
        <ChatContentHedder  details={currentChat} />
        <div className="chat-history">
            <ul className="m-b-0">
                {
                    messages.map((message,index)=>{
                       return <div key={index} ref={scrollRef}>
                        {
                        message?.sender === auth.user._id
                            ? <Messages  message={message} self /> 
                            : <Messages message={message} />
                        }
                        </div>
                    })
                }
                {/* <Messages  self/>
                <Messages />
                <Messages /> */}
            </ul>
        </div>
        <SendMessage updateMsg={getMessages} currentChat={currentChat} socket={socket} />
    </div>
    :
    <div className="chat" style={{height:'100vh'}}>
        <p className='text-center my-5 h4 text-secondary'>open chat to continue</p>
    </div>
  )
}

export default ChatContent