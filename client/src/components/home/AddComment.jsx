import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../../redux/actions/postAction'
import { getUserPosts } from '../../redux/actions/profileActions'
import config from '../../utils/config'
import { patchDataAPI } from '../../utils/fetchData'

function AddComment({ post,updatePost ,from}) {
  const [comment, setComment] = useState('')
  const {auth,posts,profile} =  useSelector(state=>state)
  const dispatch = useDispatch()
  const {id} = useParams()

  const sendComment=(e)=>{
    e.preventDefault()
    if (!comment.trim()) return

    let postUser = auth.user._id
    let postId = post._id
    patchDataAPI('/user/post/newComment',{postUser,comment,postId},auth.token)
    .then(data=>{
      setComment('')
       updatePost ? updatePost() : dispatch(getPost(posts.pageNumber,auth.token))
       from === 'userPost' && dispatch(getUserPosts({id,auth,pageNumber:profile.pageNumber}))  
    })
  }
  return (
    <div className='d-flex px-3 my-2 pb-3'>
        <div>
        <img src={`${config.SERVER_URL}/images/profile/${auth.user?.avatar}.jpg`}
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