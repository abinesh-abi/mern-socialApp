import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { patchDataAPI } from '../../utils/fetchData'

function FollowBtn({user,updateUser}) {
  const [followed, setFollowed] = useState('follow')
  const {auth,profile} = useSelector(state=>state)


  useEffect(()=>{

    // check blocked or not
    let blocked = user?.blockedUsers?.includes(auth?.user?._id)
    if (blocked) return setFollowed('blocked')
  
    //find followed
  let isfollowed = profile?.users?.following?.includes(user?._id)
  if(isfollowed)return setFollowed('followed')

  // check whether send follow reqest before
  let isRequest = user?.followRequest?.includes(auth?.user?._id)
  if(isRequest)return setFollowed('requested')
  },[profile?.users?._id,user?._id])
  
  function follow() {
    patchDataAPI(`/user/${user._id}/follow`,{},auth.token)
    .then(({data})=>{
      updateUser()
      setFollowed('requested')
    })
  }
  function unFollow() {
    patchDataAPI(`/user/${user._id}/unFollow`,{},auth.token)
    .then(({data})=>{
      updateUser()
      setFollowed('follow')
    })
  }

  return (
    <div className='mx-2'>
    {
      followed == 'blocked' &&
    <Link className="btn btn-primary mx-auto "
    onClick={()=>swal("This User Blocked you")}
    >
      Follow
    </Link> 
    }
    {
      followed == 'follow' &&
    <Link className="btn btn-primary mx-auto"
    onClick={follow}
    >
      Follow
    </Link> 
    }
    {
      followed === 'requested' &&
    <Link className="btn btn-primary mx-auto"
    >
      Requested
    </Link> 
    }
    {
      followed == 'followed'  &&
    <Link className="btn btn-primary mx-auto"
    onClick={unFollow}
    >
      Unfollow
    </Link> 
    }

</div>
  )
}



export default FollowBtn