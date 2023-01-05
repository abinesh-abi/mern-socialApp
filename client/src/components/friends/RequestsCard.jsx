import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { acceptRequest, rejectRepuest } from '../../redux/actions/friendsAction'
import config from '../../utils/config'
import ImageRounded from '../common/ImageRounded'

function RequestsCard({user}) {
  const [status, setStatus] = useState('')
  const {auth,profile} = useSelector(state=>state)
  const navigate = useNavigate();


    function openPorofile() {
      navigate(`/profile/${user._id}`)
    }
    
    function accept() {
      acceptRequest({id:user._id,auth}).then(data=>setStatus('accepted'))
    }

    function reject() {
      rejectRepuest({id:user._id,auth}).then(data=>setStatus('rejected'))
    }

  return (
    <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'240px'}}>
        <div onClick={openPorofile} className='mx-auto m-2'>
        <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/${user.avatar}.jpg`} />
        </div>
        <p className='mx-auto' onClick={openPorofile}>{user.fullname} </p>
        {
          !status && 
            <div className='d-flex'>
                <button onClick={accept} className='btn btn-primary w-75 mx-2'>Accept</button>
                <button onClick={reject} className='btn btn-secondary w-75 mx-2'>Reject</button>
            </div>
       }
       {
        status === 'accepted' &&
          <p className='mx-auto text-success'>Accepted</p>
       }
       {
        status === 'rejected' &&
          <p className='mx-auto text-secondary'>Rejected</p>
       }

     </div>
  )
}

export default RequestsCard