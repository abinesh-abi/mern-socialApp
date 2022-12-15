import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileUsers } from '../redux/actions/profileActions'
import { postDataAPI } from '../utils/fetchData'
import FollowRequestItems from './FollowListItems'

function FollowRequest() {
    
    let listDiv ={height:'50px',borderRadius: "3%",
         'position' :'relative'
}
    const [followers, setFollowers] = useState([])
  const {auth,profile} = useSelector(state=>state)
    
  const dispatch =  useDispatch()
    let getFollowers=async()=>{

      postDataAPI('/user/followRequest',{},auth.token)
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
<div className="card py-3 my-4 shadowmt-3 round" style={{height:'47%'}}>
{/* <div className="py-3 shadow round mt-3"> */}
        <div className=" d-flex mb-3  align-items-center shadow-sm px-4 mx-1" style={listDiv}>
            <h4 className='mx-3'>Follow Requrests</h4>
        </div>
        {
         followers?.length !== 0 && followers?.map((user,index)=>{
            let isFollows = profile.users?.following?.includes(user.values._id)

           return <FollowRequestItems
           key={index} id={user?.values?._id}
           name={user?.values?.fullname} 
           avatar={user.values.avatar} 
           isFollows={isFollows} />
          })
        }
     </div>

  )
}

export default FollowRequest