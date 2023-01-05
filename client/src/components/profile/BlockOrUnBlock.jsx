import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileUsers } from '../../redux/actions/profileActions'
import { patchDataAPI, postDataAPI } from '../../utils/fetchData'

function BlockOrUnBlock({user}) {
  const {auth,profile} = useSelector(state=>state)
  let isBlocked = profile?.users?.blockedUsers?.find(data=>data == user?._id)
  let dispatch  = useDispatch()

  function blockUser() {
    patchDataAPI('/user/block',{user:user._id},auth.token)
    .then(({data})=>{
        dispatch(getProfileUsers({id:auth?.user?._id,auth})) 
    })
  }
  function unBlockUser() {
    patchDataAPI('/user/unBlock',{user:user._id},auth.token)
    .then(({data})=>{
        dispatch(getProfileUsers({id:auth?.user?._id,auth})) 
    })
  }
    
  return (
    <div className='mx-2'>
    {
        isBlocked?
        <Link className='btn btn-danger' onClick={unBlockUser} >Unblock</Link>
        :
        <Link className='btn btn-danger'  onClick={blockUser}>Block</Link>
    }
        
    </div>
  )
}

export default BlockOrUnBlock