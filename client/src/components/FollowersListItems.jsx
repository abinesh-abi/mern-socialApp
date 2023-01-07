import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { getProfileUsers } from '../redux/actions/profileActions'
import config from '../utils/config'
import { patchDataAPI } from '../utils/fetchData'

function FollowersListItems({id , name , avatar,followStatus}) {
    const [status, setStatus] = useState('')

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

  useEffect(()=>{
    setStatus(followStatus)
  },[])
    
    function follow() {
        patchDataAPI(`/user/${id}/follow`,{},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth.user._id,auth:auth}))
            setStatus('requested')
        })
    }
    function unFollow() {
        patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth.user._id,auth:auth}))
            setStatus('follow')
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
            //     isFollows ?
            // <Link onClick={unFollow} className='mx-3' style={{'lineHeight': '45px',}}>Unfollow</Link>
            // :
            // <Link onClick={follow} className='mx-3' style={{'lineHeight': '45px',}}>Follow Back</Link>
            }
            {
                status === 'blocked' &&
                <Link onClick={()=>swal(`${name} is blocked you to follow`)} className='mx-3' style={{'lineHeight': '45px',}}>Follow</Link>
            }
            {
                status === 'follow' &&
                <Link onClick={follow} className='mx-3 text-success' ><i className="fa-solid fa-user-plus"></i></Link>
            }
            {
                status === 'requested' &&
                <Link  className='mx-3' style={{'lineHeight': '45px',}}>Requested</Link>
            }
            {
                status === 'following' &&
                <Link onClick={unFollow} className='mx-3 text-danger' ><i className="fa-solid fa-user-minus"></i></Link>
            }
        </div>
        </div>
  )
}

export default FollowersListItems