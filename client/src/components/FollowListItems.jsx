import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileUsers } from '../redux/actions/profileActions'
import { patchDataAPI } from '../utils/fetchData'

function FollowRequestItems({id , name , avatar , isFollows ,updaeFollowers}) {
    const [status, setStatus] = useState(false)

    let listDiv ={height:'50px',borderRadius: "3%",
         'position' :'relative'
}
    let listImage = {
                   borderRadius: "50%",
                   width: "40px",
                   height: "40px",
                   position: 'relative',
                   top:'4px'
                }

  const {auth} = useSelector(state=>state)
  const dispatch =  useDispatch()
    
    function accept() {
        patchDataAPI(`/user/${id}/acceptRequest`,{},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth.user._id,auth:auth}))
            setStatus(true)
        })
    }
    function unFollow() {
        patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth.user._id,auth:auth}))
        })
    }
  return (
        <div className=" d-flex justify-content-between shadow-sm px-3 mx-1" style={listDiv}>
            <Link to={`/profile/${id}`} style={{textDecoration:'none'}}>
            <div className='d-flex'>
                <img
                className="img-fluid"
                src={`http://127.0.0.1:5000/images/profile/${avatar}.jpg`}
                style={listImage}
                alt=""
                />
                <p className='mx-3 text-dark' style={{'lineHeight': '45px'}}>{name}</p>
            </div>
         </Link>
        <div className='d-flex justify-content-end'>
            {
                status ?
            <Link className='mx-3' style={{'lineHeight': '45px',}}>Accepted</Link>
            :
            <Link onClick={accept} className='mx-3' style={{'lineHeight': '45px',}}>Accept</Link>

            }
        </div>
        </div>
  )
}

export default FollowRequestItems