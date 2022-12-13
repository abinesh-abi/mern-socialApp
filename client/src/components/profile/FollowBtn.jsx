import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { patchDataAPI } from '../../utils/fetchData'

function FollowBtn({user,updateUser}) {
  const [followed, setFollowed] = useState(false)
  const {auth} = useSelector(state=>state)


  useEffect(()=>{
  let isfollowed = auth?.user?.following?.includes(user?._id)
  setFollowed(isfollowed)
  })
  
  function follow() {
    patchDataAPI(`/user/${user._id}/follow`,{},auth.token)
    .then(({data})=>{
      updateUser()
    })
  }
  function unFollow() {
    patchDataAPI(`/user/${user._id}/unFollow`,{},auth.token)
    .then(({data})=>{
      updateUser()
    })
  }

  

  return (
    <>
    {
      followed?
    <Link className="btn btn-primary mx-auto"
    onClick={unFollow}
    >
      Unfollow
    </Link> :
    <Link className="btn btn-primary mx-auto"
    onClick={follow} 
    >
      Follow
    </Link> 

    }

</>
  )
}

export default FollowBtn