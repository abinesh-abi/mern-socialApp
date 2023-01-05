import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileUsers } from '../redux/actions/profileActions'
import { postDataAPI } from '../utils/fetchData'
import FollowersListItems from './FollowersListItems'
import FollowingsListItems from './FollowingsListItems'

function Followings() {
    
    const [followings, setFollowings] = useState([])
  const {auth} = useSelector(state=>state)
    
  const dispatch =  useDispatch()
    let getFollowings=async()=>{

      postDataAPI('/user/followings',{},auth.token)
      .then(({data})=>{
        setFollowings(data.data)
        dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
      })
    }
    useEffect(()=>{
      getFollowings()
      dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
    },[dispatch,followings?.length])

  return (
    <div className="card py-3 my-4 shadowmt-3 round h-100" > 
        <div className=" d-flex mb-3  align-items-center shadow-sm px-4 mx-1" >
            <h4 className='mx-3'>Followings</h4>
        </div>
        {
         followings?.length !== 0 && followings?.map((user,index)=>{
           return <FollowingsListItems
           key={index} id={user?.values?._id}
           name={user?.values?.fullname} 
           avatar={user.values.avatar} 
           />
          })
        }
        {
          !followings?.length && 
           <p className='mx-auto'>There is no followings</p>
        }
     </div>

  )
}

export default Followings