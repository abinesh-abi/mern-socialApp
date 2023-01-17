import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import config from '../../utils/config'
import { getDataAPI } from '../../utils/fetchData'
import ImageRounded from '../common/ImageRounded'

function ChatSideItems({details,auth,status}) {
    const [otherUser, setOtherUser] = useState({})

    const getOtherUser = ()=>{
        const friendId = details?.members?.find((val)=> val !== auth?.user._id)
        getDataAPI(`/user/${friendId}`,auth?.token)
        .then(({data})=>{
            setOtherUser(data.user)
        })
    }
    useEffect(()=>{
        auth?.token && getOtherUser()
    },[auth?.token])
  return (
    <li className="d-flex px-4 my-2 py-1">
        <img src={otherUser?.avatar} alt="avatar" width={50} height={50} />
        <div className="about">
            <div className="name">{otherUser?.fullname}</div>
            {
                 status ?  <div className="status"> <i className="fa fa-circle online"></i> <span className='text-success'>Online</span>  </div>                                            
                 :
                  <small className='text-secondary'>{format(otherUser?.updatedAt)}</small>
            }
        </div>
    </li>
  )
}

export default ChatSideItems
  

