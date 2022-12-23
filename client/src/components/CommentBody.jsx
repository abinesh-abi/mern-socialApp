import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { patchDataAPI } from '../utils/fetchData'

function CommentBody({postId,userDetail,comment,commentId ,findPosts}) {
  const {auth} =  useSelector(state=>state)

  function likeComment (){
      patchDataAPI(`/user/post/coment/like`,{postId,commentId},auth.token)
      .then(({data})=>{
        findPosts()
      }
      )
  }
  function unLikeComment (){
      patchDataAPI(`/user/post/coment/unLike`,{postId,commentId},auth.token)
      .then(({data})=>{
        findPosts()
      }
      )
  }
  function deleteComent() {
    patchDataAPI(`/user/post/coment/delete`,{postId,commentId},auth.token)
    .then(({data})=>{
      findPosts()
    })
  }
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
                  <small>{comment.message}</small>
              </div>
              {
                comment?.like?.includes(auth.user._id)?
                  <i onClick={unLikeComment} className="fa fa-heart text-danger mx-2"></i>  
                :
                  <i onClick={likeComment} className="fa fa-heart text-secondary mx-2"></i>
              }
                  <small>{comment.like.length}</small>

           </div>
           {
             auth.user._id === userDetail._id ?
                <em  className="fa fa-ellipsis-h ml-2" type="button" data-toggle="dropdown" aria-expanded="false"></em>
                : ""

           }
                  {/* dropdown */}
                   <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style={{position: 'absolute', transform: 'translate3d(-136px, 28px, 0px)', top: "0px", left: "0px", "willChange": "transform"}}>
                    {
                        auth.user._id !== userDetail._id ?
                        <>
                        <Link className="dropdown-item" to="/">Stop following</Link> 
                        </> :

                        <>
                          <Link className="dropdown-item" 
                          onClick={()=>deleteComent()}
                          >Delete Comment</Link> 
                        </>

                    }
                  </div>

        </div>

    </div>
    </>
  )
}

export default CommentBody