import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileUsers } from '../redux/actions/profileActions'
import { postDataAPI } from '../utils/fetchData'
import FollowersListItems from './FollowersListItems'

function Followers() {
    const [followers, setFollowers] = useState([])
  const {auth,profile} = useSelector(state=>state)
    
  const dispatch =  useDispatch()
    let getFollowers=async()=>{

      postDataAPI('/user/followers',{},auth.token)
      .then(({data})=>{
        setFollowers(data.data)
        dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
      })
    }
    useEffect(()=>{
      getFollowers()
      dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
    },[dispatch,followers?.length])

  return (
    <div className="card py-3 my-4 shadowmt-3 round h-100" > 
        <div className=" d-flex mb-3  align-items-center shadow-sm px-4 mx-1" >
            <h4 className='mx-3'>Followers</h4>
        </div>
        {
         followers?.length !== 0 && followers?.map((user,index)=>{
            let followStatus = 'follow'
            // chek user follows
            let isFollows = profile.users?.following?.includes(user.values._id)
            if (isFollows) followStatus = 'following'
            // check requested
            let retquested = user?.values?.followRequest?.includes(profile?.users?._id)
            if(retquested) followStatus = 'requested'

            // Check user Blocked
            let blocked = user?.values?.blockedUsers?.includes(profile?.users?._id)
            if(blocked) followStatus = 'blocked'

           return <FollowersListItems 
           key={index} id={user?.values?._id}
           name={user?.values?.fullname} 
           avatar={user.values.avatar} 
           isFollows={isFollows} 
           followStatus={followStatus} />
          })
        }
        <div className='d-flex justify-content-center my-3'>
          <Link to={'/friends'} >View More</Link>
        </div>
     </div>

  )
}

export default Followers