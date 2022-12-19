import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import ChatContentHedder from './ChatContentHedder'
import Messages from './Messages'
import SendMessage from './SendMessage'

function ChatContent({socket,currentChat}) {
    const [messages, setMessages] = useState([])
    const {auth,chat} =  useSelector(state=>state)
    const scrollRef = useRef()
    
    // function getMessages() {
    //     getDataAPI(`/user/chat/message/getChat/${currentChat?._id}`,auth.token)
    //     .then(({data})=>setMessages(data.data))
    // }
    // useEffect(()=>{
    //    auth.token && getMessages()
    // },[auth?.token])

    useEffect(()=>{
        setMessages(chat.messages)
        scrollRef?.current?.scrollIntoView({behavior:'smooth'})
    },[chat?.messages])

    useEffect(()=>{
        socket.current.on('getMessage',(data=>{
            setMessages(val=>[...val,data])
        }))
    },[])
    console.log(messages.length)

  return (
    <div className="chat">
        <ChatContentHedder />
        <div className="chat-history">
            <ul className="m-b-0">
                {
                    messages?.map((message,index)=>{
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
        <SendMessage  currentChat={currentChat} socket={socket} />
    </div>
  )
}

export default ChatContent