import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';
import ChatSeachItems from './ChatSeachItems';
import ChatSearch from './ChatSearch';
import ChatSideItems from './ChatSideItems';

function ChatSideBar({getMessages,onlineUsers}) {
    const [searchInput, setSearchInput] = useState('')
    const [isSearch, setisSearch] = useState(false)
    const [searchItems, setSearchItems] = useState('')
    const [messages, setMessages] = useState([])

    const { auth ,chat } = useSelector((state) => state);



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
  return (
    <div id="plist" className="people-list">
            <ChatSearch />
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
                                    status={onlineUsers.includes(val.members.find(data=>data != auth.user?._id))}
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
  )
}

export default ChatSideBar