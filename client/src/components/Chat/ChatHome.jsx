import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import ChatContent from './ChatContent'
import ChatSearch from './ChatSearch'
import ChatSideItems from './ChatSideItems'
import config from '../../utils/config' 
import io from 'socket.io-client'
import Messages from './Messages'
import SendMessage from './SendMessage'
import ChatContentHedder from './ChatContentHedder'

function ChatHome() {
    const { auth } = useSelector((state) => state);
    const [chatItems, setchatItems] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const socket = useRef(io(config.SERVER_URL))



    const [messages, setMessages] = useState([])
    const scrollRef = useRef()

    // socket
    useEffect(()=>{
     socket.current.emit('setup',{_id:auth?.user?._id})
     socket.current.on('connected',console.log('socket connected'))
    },[])

    function getChat() {
        getDataAPI('/user/chat/get',auth.token)
        .then(({data})=>{
            setchatItems(data.data)
        })
    }

    function joinChat(val) {
        setCurrentChat(val)
        socket.current.emit('join chat',val._id)
    }
    useEffect(()=>{
       auth.token && getChat()
    },[auth?.user?._id,auth.token])


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
        socket?.current.on('message recieved',(data=>{
            console.log(data)
        }))
    })




  return (
    <div className="container">
    <div className="row clearfix">
        <div className="col-lg-12">
            <div className="card chat-app">
            <div id="plist" className="people-list">
            <ChatSearch />
            <ul className="list-unstyled chat-list mt-2 mb-0">
                {
                    chatItems.map((val,index)=>{
                        return <div key={index} onClick={()=>joinChat(val)}>
                            <ChatSideItems src={"https://bootdey.com/img/Content/avatar/avatar1.png" }
                                status={true ? 'online':'7'}
                                details={val}
                                auth={auth}
                            />
                        </div>
                    })
                }
            </ul>
           </div>
                {/* {currentChat && <ChatContent currentChat={currentChat} socket={socket} />}  */}


                {/* ------chat body -------- */}
                {

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
                }
            {/* -------cahat body end --------- */}
            </div>
        </div>
    </div>
    </div>
  )
}

export default ChatHome