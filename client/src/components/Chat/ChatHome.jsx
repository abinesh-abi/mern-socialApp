import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import ChatSearch from './ChatSearch'
import ChatSideItems from './ChatSideItems'
import config from '../../utils/config' 
import io from 'socket.io-client'
import Messages from './Messages'
import SendMessage from './SendMessage'
import ChatContentHedder from './ChatContentHedder'
import ChatSeachItems from './ChatSeachItems'
import { fetchMessages, getAllChat, getCurretChat, getOtherUser } from '../../redux/actions/chatAction'
import ChatContent from './ChatContent'

function ChatHome() {
    const { auth ,chat } = useSelector((state) => state);
    const state = useSelector((state) => state);
    const [chatItems, setchatItems] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [otherUser, setOtherUser] = useState({})
    const [onlineUsers, setOnlineUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [isSearch, setisSearch] = useState(false)
    const [searchItems, setSearchItems] = useState('')
    const scrollRef = useRef()
    const socket = useRef()
    const dispatch =  useDispatch()

    useEffect(()=>{
        socket.current=io(config.SERVER_URL)
    },[])
    // socket
    useEffect(()=>{
        socket.current.emit('addUser',auth?.user?._id)
        socket.current.on('getUsers',users=>{
            let userIds = users?.map(data=>data.userId)
            setOnlineUsers(userIds)
        })
    },[auth?.user])

    



    useEffect(()=>{
       auth?.token && dispatch(getAllChat({auth}))
    },[auth?.user?._id,auth.token])

    useEffect(()=>{
        setMessages(state.chat.messages)
        setOtherUser(state.chat.otherUser)
    },[state.chat.messages?.length,state.chat.otherUser])


    function getMessages(val) {
        setCurrentChat(val)
        dispatch(getCurretChat({chatDetails:val}))
        // getDataAPI(`/user/chat/message/getChat/${val?._id}`,auth.token)
        // .then(({data})=>{
        //    setMessages(data.data)
        // })

        dispatch(fetchMessages({id:val._id,auth}))

        // getuserdetail
        const friendId = val?.members?.find((data)=> data !== auth?.user._id)
        dispatch(getOtherUser({id:friendId,auth}))

        // getDataAPI(`/user/${friendId}`,auth?.token)
        // .then(({data})=>{
        //     setOtherUser(data.user)
        // })
    }


    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior:'smooth'})
    },[messages])

    function searchSubmit(e) {
        e.preventDefault()
        postDataAPI(`/user/search`,{name:searchInput},auth.token)
        .then(({data})=>{
            setisSearch(true)
            let users = data.users.filter(value=>value._id !== auth.user._id)
            setSearchItems(users)
        })
    }

   async function getSerchMessages(val){
    getDataAPI(`/user/chat/searchChat/${val._id}`,auth.token)
    .then(({data})=>{
        let oUsr= searchItems.find(data=>data._id === val._id)
        // get messages
        getDataAPI(`/user/chat/message/getChat/${data.data?._id}`,auth.token)
        .then(({data})=>{
           setMessages(data.data)
        })
        setCurrentChat(data.data)
        setchatItems((chats)=>[...chats,data.data])
        setSearchInput('')
        setOtherUser(oUsr)
    })
    }

    // know search or not search 
    useEffect(()=>{
        let closeSearch =document.getElementById('close-search')
        if (!searchInput) {
            setisSearch(false)
            closeSearch.style.display='none'
        }else{
            closeSearch.style.display='block'
        }
    })

    
  return (
    <>
    <div className="container">
    <div className="row clearfix">
        <div className="col-lg-12">
            <div className="card chat-app">
                {/* sideBar */}



            <div id="plist" className="people-list">
            {/* <ChatSearch /> */}
            {/* search */}
            <div className="input-group">
                <form onSubmit={searchSubmit}>
                    <input type="text" className="form-control" placeholder="Search..." value={searchInput} onChange={e=>setSearchInput(e.target.value)} />
                    <div className="input-group-prepend position-relative">
                        <i id='close-search'
                         className="fa-sharp fa-solid fa-xmark position-absolute text-danger chat-search-close"
                         onClick={()=>{
                            setSearchInput('')
                        }}
                        ></i>
                        <button type='submit' className="input-group-text chat-search-button" ><i className="fa fa-search"></i></button>
                    </div>
                </form>
            </div>
            {/* search end*/}
            <ul className="list-unstyled chat-list mt-2 mb-0">
                <div className='friend-lst-scrollable'>
                    {
                        !isSearch ?
                        <>
                        <p className='pt-1'>Current Chat</p>
                         {chat.allChat?.map((val,index)=>{
                            return <div key={index} onClick={()=>getMessages(val)}>
                                <ChatSideItems 
                                    status={onlineUsers.includes(val.members?.find(data=>data != auth.user?._id))}
                                    details={val}
                                    auth={auth}
                                />
                            </div>
                        })}
                        </>
                        :
                        <>
                        <p className='pt-1'>Search Items</p>
                        {searchItems.map((val,index)=>{
                            return <div key={index} onClick={()=>getSerchMessages(val)}>
                                <ChatSeachItems 
                                    status={onlineUsers.includes(val._id)}
                                    details={val}
                                    auth={auth}
                                />
                            </div>
                        })}
                        </>
                    }
                </div>
            </ul>
           </div>
            {
            currentChat && <ChatContent currentChat={currentChat} socket={socket} />
            }
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default ChatHome