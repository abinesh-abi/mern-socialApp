import React from 'react'
import { Link } from 'react-router-dom'
import config from '../../utils/config'
import ImageRounded from '../common/ImageRounded'

function FollowersLarge() {
  return (
    <div className='mx-auto friend-div d-flex mt-4'>

      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>
      <div className='card border shadow mx-2 my-2' style={{width:'200px',height:'220px'}}>
        <div className='mx-auto m-2'>
          <ImageRounded size={130} src={`${config.SERVER_URL}/images/profile/avatar.jpg`} />
        </div>
        <button className='btn btn-secondary w-75 mx-auto'>Unfollow</button>
      </div>

    </div>
  )
}

export default FollowersLarge