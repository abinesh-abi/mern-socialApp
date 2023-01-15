import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Followers from './Followers'
import Followings from './Followings'
import FollowRequest from './FollowRequest'

function Community() {
    const [items, setItems] = useState('followers')
  return (
    <>
    <div className="card py-3 my-4 shadowmt-3 h-75 community" > 
    <div className='d-flex justify-content-around'>
        <Link  onClick={()=>setItems('followers')} 
        className={`btn ${items === 'followers'?'btn-success':'btn-primary'}`}
        >Followers</Link>
        <Link onClick={()=>setItems('following')} 
        className={`btn ${items === 'following'?'btn-success':'btn-primary'}`}
        >followings</Link>
        <Link onClick={()=>setItems('requests')} 
        className={`btn ${items === 'requests'?'btn-success':'btn-primary'}`}
        >Requests</Link>
    </div>
    {
        items === 'followers' &&
        <Followers />
    }
    {
        items === 'requests' &&
      <FollowRequest />
    }
    {
        items === 'following' &&
      <Followings />
    }
    </div>
    </>
  )
}

export default Community