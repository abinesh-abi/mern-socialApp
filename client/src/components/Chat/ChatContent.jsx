import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatContentHedder from './ChatContentHedder'
import Messages from './Messages'
import SendMessage from './SendMessage'

function ChatContent({socket,currentChat,onlineUsers}) {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const {auth,chat} =  useSelector(state=>state)
    const scrollRef = useRef()

useEffect(()=>{
    setMessages(chat.messages)
},[chat.messages])

    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior:'smooth'})
    },[messages,chat.messages])

    useEffect(()=>{
        socket.current.on("getMessage",data=>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage && 
        setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])
  return (
    <div className="chat">
        <ChatContentHedder onlineUsers={onlineUsers} />
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
            </ul>
        </div>
        <SendMessage  currentChat={currentChat} socket={socket} />
    </div>
  )
}

export default ChatContent