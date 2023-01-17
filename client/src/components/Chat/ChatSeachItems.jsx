
import React, { useEffect, useState } from 'react'
import config from '../../utils/config'
import { getDataAPI } from '../../utils/fetchData'

function ChatSeachItems({details,auth,status}) {
    const [otherUser, setOtherUser] = useState({})

    const getOtherUser = ()=>{
        const friendId = details._id
        getDataAPI(`/user/${friendId}`,auth?.token)
        .then(({data})=>{
            setOtherUser(data.user)
        })
    }
    useEffect(()=>{
        auth?.token && getOtherUser()
    },[auth?.token])


  return (
    // <li className="clearfix" onClick={getChat}>
    <li className="d-flex px-4 my-2 py-1" >
        <img src={otherUser?.avatar} alt="avatar" width={50} height={50}/>
        <div className="about">
            <div className="name">{otherUser.fullname}</div>
            {
                 status &&  <div className="status"> <i className="fa fa-circle online"></i> {status} </div>                                            
            }
        </div>
    </li>
  )
}

export default ChatSeachItems
  
