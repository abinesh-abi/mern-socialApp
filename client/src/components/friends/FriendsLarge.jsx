import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FollowersLarge from './FollowersLarge'
import '../../styles/friends.css'

function Friends() {
    const [items, setItems] = useState('followers')
  return (
    <>
    <div className=" py-3 my-4 shadowmt-3 h-75 d-flex flex-column" > 

    <div className='d-flex mx-auto'>
        <Link  onClick={()=>setItems('followers')} 
        className={`btn ${items === 'followers'?'btn-success':'btn-primary'} mx-3`}
        >Followers</Link>
        <Link onClick={()=>setItems('following')} 
        className={`btn ${items === 'following'?'btn-success':'btn-primary'} mx-3`}
        >followings</Link>
        <Link onClick={()=>setItems('requests')} 
        className={`btn ${items === 'requests'?'btn-success':'btn-primary'} mx-3`}
        >Requests</Link>
    </div>
    {
        items === 'followers' &&
        <FollowersLarge />
    }
    {
        items === 'requests' &&
        <h1>reqests</h1>
    }
    {
        items === 'following' &&
        <h1>following</h1>
    }
    </div>
    </>
  )
}

export default Friends