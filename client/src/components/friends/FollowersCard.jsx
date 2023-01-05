import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { followUser, unFollowUser } from '../../redux/actions/friendsAction'
import config from '../../utils/config'
import ImageRounded from '../common/ImageRounded'

function FollowersCard({user}) {
  const [followStatus, setFollowStatus] = useState('follow')
  const {auth,profile} = useSelector(state=>state)
  const navigate = useNavigate();


    useEffect(()=>{

      let isFollows = profile.users?.following?.includes(user._id)
      if (isFollows) setFollowStatus('following') 
      // check requested
      let retquested = user?.followRequest?.includes(profile?.users?._id)
      if(retquested) setFollowStatus('requested') 

      // Check user Blocked
      let blocked = user?.blockedUsers?.includes(profile?.users?._id)
      if(blocked) setFollowStatus('blocked') 

    },[profile.users])

    function openPorofile() {
      navigate(`/profile/${user._id}`)
    }
    function follow (){
      followUser({id:user._id,auth})
      .then(({data})=>{
        setFollowStatus('requested')
      })
    }
    function unfollow() {
      unFollowUser({id:user._id,auth})
      .then(({data})=>{
        setFollowStatus('follow')
      })
    }

  return (
    <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'240px'}}>
        <div onClick={openPorofile} className='mx-auto m-2'>
        <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/${user.avatar}.jpg`} />
        </div>
        <p className='mx-auto' onClick={openPorofile}>{user.fullname} </p>
            {
                followStatus === 'blocked' &&
                <button className='btn btn-secondary w-75 mx-auto'>Blocked</button>
            }
            {
                followStatus === 'follow' &&
                <button onClick={follow} className='btn btn-primary w-75 mx-auto'>Follow</button>
            }
            {
                followStatus === 'requested' &&
                <button className='btn btn-success w-75 mx-auto'>Requested</button>
            }
            {
                followStatus === 'following' &&
                <button onClick={unfollow} className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
            }
     </div>
  )
}

export default FollowersCard