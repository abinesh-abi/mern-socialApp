import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import ChatSideItems from './ChatSideItems'
import config from '../../utils/config' 
import io from 'socket.io-client'
import ChatSeachItems from './ChatSeachItems'
import { CHAT_TYPES, fetchMessages, getAllChat, getCurretChat, getOtherUser } from '../../redux/actions/chatAction'
import ChatContent from './ChatContent'

function ChatHome() {
    const { auth ,chat,socket} = useSelector((state) => state);
    const state = useSelector((state) => state);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [isSearch, setisSearch] = useState(false)
    const [searchItems, setSearchItems] = useState('')
    const scrollRef = useRef()
    // const socket = useRef()
    const dispatch =  useDispatch()


    // useEffect(()=>{
    //     socket.current=io(config.SERVER_URL)
    // },[])
    // socket
    useEffect(()=>{
        socket?.socket?.current?.emit('addUser',auth?.user?._id)
        socket?.socket?.current?.on('getUsers',users=>{
            let userIds = users?.map(data=>data.userId)
            setOnlineUsers(userIds)
        })
    },[auth?.user])

    useEffect(()=>{
        socket?.socket?.current?.on('getUsers',users=>{
            let userIds = users?.map(data=>data.userId)
            setOnlineUsers(userIds)
    })
    })



    useEffect(()=>{
       auth?.token && dispatch(getAllChat({auth}))
    },[auth?.user?._id,auth.token])

    useEffect(()=>{
        setMessages(state.chat.messages)
    },[state.chat.messages?.length,state.chat.otherUser])


    function getMessages(val) {
        dispatch(getCurretChat({chatDetails:val}))

        dispatch(fetchMessages({id:val._id,auth}))

        // getuserdetail
        const friendId = val?.members?.find((data)=> data !== auth?.user._id)
        dispatch(getOtherUser({id:friendId,auth}))

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
            dispatch({
                type:CHAT_TYPES.GET_OTHER_USER,
                payload:{otherUser:oUsr}
            })
        dispatch(fetchMessages({id:data.data._id,auth}))
        dispatch(getCurretChat({chatDetails:val}))
        dispatch(getAllChat({auth}))
        setSearchInput('')
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
            state.chat.currentChat && <ChatContent currentChat={state.chat.currentChat} socket={socket}  onlineUsers={onlineUsers}/>
            }
            {
             !state.chat.currentChat &&
            <div className="chat h-100vh text-center">
                <p className='h5 mt-5'>Select Any chat to continue messaging</p>
            </div>
            }
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default ChatHome