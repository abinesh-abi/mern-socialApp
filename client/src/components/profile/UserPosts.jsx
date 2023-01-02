import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { getProfileUsers, getUserPosts } from '../../redux/actions/profileActions'
import { deleteDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import CommentBody from '../CommentBody'
import AddComment from '../home/AddComment'
import EditPost from '../home/EditPost'

function UserPosts() {
  const [editPost,setEditPost] = useState({})
  const [pageNumber, setPageNumber] = useState(1);
  
  const {auth ,profile} = useSelector(state=>state)
  let dispatch  = useDispatch()
  const {id} = useParams()

    useEffect(()=>{
       auth.token && dispatch(getUserPosts({id,auth,pageNumber}))
    },[auth.token,pageNumber])

    function previousFn() {
        setPageNumber((val) => val - 1);
    }
    function nextFn() {
        setPageNumber((val) => val + 1);
    }

    function unFollow() {
        patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
        .then(({data})=>{
            auth.token && dispatch(getUserPosts({id,auth}))
        })
    }
    function deletePost(postId) {
        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this post !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    deleteDataAPI(`/user/post/delete/${postId}`,auth.token)
                    .then(({data})=>{
                        dispatch(getUserPosts({id,auth}))
                    })
                }
            });
    }
    function removeFromSaved(postId) {
        patchDataAPI('/user/post/savePost/remove',{postId},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
            dispatch(getUserPosts({id,auth}))
        })
        
    }
    function savePost(postId) {
        postDataAPI('/user/post/savePost/add',{postId},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
            dispatch(getUserPosts({id,auth}))
        })
    }
    function like(postId) {
        patchDataAPI(`/user/post/like`,{postId},auth.token)
        .then(({data})=>{
            dispatch(getUserPosts({id,auth}))
        }
        )
        
    }
    function unLikePost(postId) {
        patchDataAPI(`/user/post/unLike`,{postId},auth.token)
        .then(({data})=>{
            dispatch(getUserPosts({id,auth}))
        })
        
    }

    
  return (
    <div>
        {
          profile?.posts?.posts && <>
                <div className='d-flex m-4 h5'>
                    <p className='mx-auto'>Users Posts</p>
                </div>
            </>
        }
        {
            profile?.posts?.posts && pageNumber > 1  && <div className='d-flex'>
                <button 
                className='btn btn-primary mx-auto'
                onClick={previousFn}
                >Previous Posts</button>
            </div>
        }
        {
            profile?.posts?.posts?.map((post,index)=>{
               return <section key={index} className="profile-feed py-2" >
    <div className="">
        <div className="row">
            <div className="col-lg-12">
                <div className="cardbox shadow-lg bg-white">

                    <div className="cardbox-heading">
                        <div className="dropdown float-right">
                            <button className="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                                <em className="fa fa-ellipsis-h"></em>
                            </button>
                            <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style={{position: 'absolute', transform: 'translate3d(-136px, 28px, 0px)', top: "0px", left: "0px", "willChange": "transform"}}>
                                {/* <Link className="dropdown-item" to="/">Hide post</Link> */}
                                {
                                    auth.user._id !== post.user ?
                                    <>
                                     <Link className="dropdown-item" onClick={()=>unFollow(post.user)} >Stop following</Link> 
                                     <Link className="dropdown-item" to="/">Report</Link>
                                    </> :

                                     <>
                                      <Link className="dropdown-item" 
                                      data-toggle="modal" data-target="#edit-post"
                                      onClick={()=>setEditPost(post)}
                                      >Edit Post</Link> 
                                      <Link className="dropdown-item" onClick={()=>deletePost(post._id)}>Delete Post</Link> 
                                    </>

                                }
                            </div>
                        </div>
                        <div className="media m-0">
                            <div className="d-flex mr-3">
                                <Link to={`/profile/${post.user}`} >
                                    {
                                        <img className="img-fluid rounded-circle" src={`http://127.0.0.1:5000/images/profile/${post.userDetail?.avatar}.jpg`} alt="User" />
                                    }
                                </Link>
                            </div>
                            <div className="media-body">
                                <p className="m-0">{post.userDetail.fullname}</p>
                                {/* <small><span><i className="icon ion-md-pin"></i> London, England</span></small>
                                <small><span><i className="icon ion-md-time"></i> 1 hour ago</span></small> */}
                            </div>
                        </div>
                    </div>

                    <div className="cardbox-heading">
                        <img className="img-fluid" src={`http://127.0.0.1:5000/images/posts/${post?._id}.jpg`} alt="Image"
                            width={"100%"}
                        />
                    </div>
                    <div className='cardbox-heading '>
                        <p className='text-secondary' >{post.content}</p>
                    </div>
                    <div className="cardbox-base">
                        <ul className="float-right">
                            <li><a><i className="fa fa-message"></i></a></li>
                            <li><a><em className="mr-5">{post.comments?.length}</em></a></li>
                            {
                                profile?.users?.saved?.includes(post._id)?
                            <li><a onClick={e=>removeFromSaved(post._id)}><i className="fa fa-bookmark mr-4 text-success"></i></a></li>
                            :
                            <li><a onClick={e=>savePost(post._id)}><i className="fa fa-bookmark mr-4"></i></a></li>

                            }
                            {/* <li><a><em className="mr-3">0</em></a></li> */}
                        </ul>
                        <ul>
                            {
                                post?.likes.includes(profile?.users?._id)?
                            <li onClick={()=>unLikePost(post._id)}><a><i className="fa fa-heart text-danger"></i></a></li>
                                :
                            <li onClick={()=>like(post._id)}><a><i className="fa fa-heart"></i></a></li>
                                
                            }
                            <li><a><span>{post.likes.length} Likes</span></a></li>
                        </ul>
                    </div>
                    {
                     post?.comments[0]  && 
                        <>
                            <h5 className='text-secondary mx-3'>Comments</h5>

                            <CommentBody  
                            userDetail={post?.commentDetails[0]} 
                            comment={post?.comments[0]} 
                            postId={post._id} 
                            commentId={post?.comments[0].commentId}
                            from={'userPost'}
                             />
                        </>
                    }
                             <div className="d-flex">
                                <Link to={`/post/${post._id}`} className='text-center mx-auto'>View more</Link>
                             </div>
                        

                    <AddComment post={post} auth={auth} from={'userPost'} />
                </div>

            </div>
        </div>
    </div>
</section>
            })
        }
        {
             pageNumber < profile?.posts?.pageCount && <div className='d-flex'>
                <button 
                className='btn btn-primary mx-auto'
                onClick={nextFn}
                >Next Posts</button>
            </div>
        }
    <EditPost editValue={editPost} from='userPost' />
    </div>
  )
}

export default UserPosts