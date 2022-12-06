import React from 'react'
import { Link } from 'react-router-dom'

function CommentBody({postId,userDetail,comment}) {
  return (
    <> 
    <div className='my-2 '>
        <div className=' px-3  mx-4 pb-3 d-flex'>
                <img src={`http://127.0.0.1:5000/images/profile/${userDetail?.avatar}.jpg`}
                className="rounded-circle" 
                style={{width:'20px',height:'20px'}}
                alt="" />
            <div>

              <div className='p-2 px-3 mx-2 ' style={{background:'#e9e9e9',width:'100%',borderRadius:"10px"}}>
                  <small className='text-secondary  d-block'>{userDetail?.fullname}</small>
                  <small>{comment}</small>
              </div>
                  <i className="fa fa-heart text-secondary mx-2"></i>
                  <small>100</small>
           </div>
            {/* <div className="text-center pt-2">
                <Link to={`/post/${postId}`} className='text-center'>View more</Link>
            </div> */}
            

        </div>

    </div>
    </>
  )
}

export default CommentBody