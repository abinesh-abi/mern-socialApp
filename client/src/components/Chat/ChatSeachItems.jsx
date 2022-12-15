
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
    <li className="clearfix" >
        <img src={`${config.SERVER_URL}/images/profile/${otherUser?.avatar}.jpg`} alt="avatar" />
        <div className="about">
            <div className="name">{otherUser.fullname}</div>
            {
                 status &&  <div className="status"> <i className="fa fa-circle online"></i> {status} </div>                                            
                // status === 'online' ?
                //     <div className="status"> <i className="fa fa-circle online"></i> {status} </div>                                            
                //     :
                //     <div className="status"> <i className="fa fa-circle offline"></i> left {status} mins ago </div>                                            
            }
        </div>
    </li>
  )
}

export default ChatSeachItems
  
