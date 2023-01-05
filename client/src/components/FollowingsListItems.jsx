import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileUsers } from '../redux/actions/profileActions'
import config from '../utils/config'
import { patchDataAPI } from '../utils/fetchData'

function FollowingsListItems({id , name , avatar}) {
    const [status, setStatus] = useState(true)

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
    
    function removeFromFollowings() {
        patchDataAPI(`/user/followings/remove`,{removeId:id},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth.user._id,auth:auth}))
            setStatus(false)
        })
    }
  return (
        <div className=" d-flex justify-content-between shadow-sm px-3 mx-1" style={listDiv}>
            <Link to={`/profile/${id}`} style={{textDecoration:'none'}}>
            <div className='d-flex'>
                <img
                className="img-fluid"
                src={`${config.SERVER_URL}/images/profile/${avatar}.jpg`}
                style={listImage}
                alt=""
                />
                <p className='mx-3 text-dark' style={{'lineHeight': '45px'}}>{name}</p>
            </div>
         </Link>
        <div className='d-flex justify-content-end'>
            {
                status ?
                <Link onClick={removeFromFollowings} className='mx-3' style={{'lineHeight': '45px',}}><i className="fa-solid fa-user-minus text-danger"></i></Link> //unfollow
                :
                <Link  className='mx-3' style={{'lineHeight': '45px',}}>Removed</Link>
            }
        </div>
        </div>
  )
}

export default FollowingsListItems