import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { patchDataAPI } from '../utils/fetchData'

function FollowersListItems({id , name , avatar , isFollows ,updaeFollowers}) {

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
    
    function follow() {
        patchDataAPI(`/user/${id}/follow`,{},auth.token)
        .then(({data})=>{
            updaeFollowers()
        })
    }
    function unFollow() {
        patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
        .then(({data})=>{
            updaeFollowers()
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
                isFollows ?
            <Link onClick={unFollow} className='mx-3' style={{'lineHeight': '45px',}}>Unfollow</Link>
            :
            <Link onClick={follow} className='mx-3' style={{'lineHeight': '45px',}}>Follow Back</Link>
            }
        </div>
        </div>
  )
}

export default FollowersListItems