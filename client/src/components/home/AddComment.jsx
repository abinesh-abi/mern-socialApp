import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import { getUserPosts } from '../../redux/actions/profileActions'
import { patchDataAPI } from '../../utils/fetchData'

function AddComment({ post, auth,updatePost ,from}) {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const sendComment=(e)=>{
    e.preventDefault()
    if (!comment.trim()) return

    let postUser = auth.user._id
    let postId = post._id
    patchDataAPI('/user/post/newComment',{postUser,comment,postId},auth.token)
    .then(data=>{
      setComment('')
       updatePost ? updatePost() : dispatch(getPost(auth.token))
       from === 'userPost' && dispatch(getUserPosts({id:auth.user._id,auth}))
    })
  }
  return (
    <div className='d-flex px-3 my-2 pb-3'>
        <div>
        <img src={`http://127.0.0.1:5000/images/profile/${auth.user?.avatar}.jpg`}
          className="rounded-circle" 
          style={{width:'30px'}}
          alt="" />
        </div>
        <form className='d-flex' onSubmit={sendComment}>
          <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" className='form-control mx-3' placeholder='add comment' style={{top:'10px'}} />
          <div>
                <i onClick={sendComment} className="fa-solid fa-paper-plane h3 text-primary mt-1 mx-3"></i>
          </div>
        </form>
    </div>
  )
}

export default AddComment