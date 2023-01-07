import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { getPost, setPagenumber } from '../../redux/actions/postAction'
import { getProfileUsers } from '../../redux/actions/profileActions'
import config from '../../utils/config'
import { deleteDataAPI, patchDataAPI, postDataAPI} from '../../utils/fetchData'
import CommentBody from '../CommentBody'
import CopyPost from '../common/CopyPost'
import AddComment from './AddComment'
import EditPost from './EditPost'
import ReportModel from './ReportModel'

function PostList() {

  const {auth,posts,profile } = useSelector(state=>state)
  const [editPost,setEditPost] = useState({})
  const [retport, setRetport] = useState(false)
  const [reportPost, setReportPost] = useState()
  const topRef = useRef()

  const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPost(posts.pageNumber,auth.token))
    },[dispatch,posts.pageNumber])

    function previousFn() {
        dispatch(setPagenumber({pageNumber: posts.pageNumber -1}))
    }
    function nextFn() {
        dispatch(setPagenumber({pageNumber: posts.pageNumber +1}))
        // dispatch(getMorePost(posts.pageNumber,auth.token))
        topRef.current.scrollIntoView({behavior:'smooth'})
     }

   const deletePost = (id)=>{
        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this post !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    deleteDataAPI(`/user/post/delete/${id}`,auth.token)
                    .then(({data})=>{
                        dispatch(getPost(posts.pageNumber,auth.token))
                    })
                }
            });
    }

    const like = (id)=>{
        patchDataAPI(`/user/post/like`,{postId:id},auth.token)
        .then(({data})=>{
            dispatch(getPost(posts.pageNumber,auth.token))
        }
        )
    }
    const unLikePost = (id)=>{
        patchDataAPI(`/user/post/unLike`,{postId:id},auth.token)
        .then(({data})=>{
            dispatch(getPost(posts.pageNumber,auth.token))
        })
    }


    function unFollow(id) {
        patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
        .then(({data})=>{
            dispatch(getPost(posts.pageNumber,auth.token))
        })
    }

    function savePost(postId) {
        postDataAPI('/user/post/savePost/add',{postId},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
            dispatch(getPost(posts.pageNumber,auth.token))
        })
        
    }
    function removeFromSaved(postId) {
        patchDataAPI('/user/post/savePost/remove',{postId},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
            dispatch(getPost(posts.pageNumber,auth.token))
        })
    }
  return (
    <>
    <div ref={topRef}></div>
        {
            posts?.posts?.posts && posts.pageNumber > 1  && <div className='d-flex'>
                <button 
                className='btn btn-primary mx-auto'
                onClick={previousFn}
                >Previous Posts</button>
            </div>
        }
    {!posts?.posts?.posts?.length ? <h3 className='text-center mt-5' >No post to show</h3> :
    posts.posts.posts.map((post,index)=>{
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
                                {
                                    auth.user._id !== post.user ?
                                    <>
                                     <Link className="dropdown-item" onClick={()=>unFollow(post.user)} >Stop following</Link> 
                                     <Link className="dropdown-item" onClick={()=>{
                                        setRetport(true)
                                        setReportPost(post)
                                    }}>Report</Link>
                                    </> :

                                     <>
                                      <Link className="dropdown-item" 
                                      data-toggle="modal" data-target="#edit-post"
                                      onClick={()=>setEditPost(post)}
                                      >Edit Post</Link> 
                                      <Link className="dropdown-item" onClick={()=>deletePost(post._id)}>Delete Post</Link> 
                                    </>
                                }
                                    <CopyPost  value={window.location.href+`post/${post._id}`}/>
                            </div>
                        </div>
                        <div className="media m-0">
                            <div className="d-flex mr-3">
                                <Link to={`/profile/${post.user}`} >
                                    {
                                        <img className="img-fluid rounded-circle" src={`${config.SERVER_URL}/images/profile/${post.userDetail.avatar}.jpg`} alt="User" />
                                    }
                                </Link>
                            </div>
                            <div className="media-body">
                                <p className="m-0">{post.userDetail.fullname}</p>
                            </div>
                        </div>
                    </div>

                    <div className="cardbox-heading">
                        <img className="img-fluid" src={`${config.SERVER_URL}/images/posts/${post?._id}.jpg`} alt="Image"
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
                        </ul>
                        <ul>
                            {
                                post?.likes.includes(profile?.users._id)?
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
                            pageNumber={posts.pageNumber}
                             />
                        </>
                    }
                             <div className="d-flex">
                                <Link to={`/post/${post._id}`} className='text-center mx-auto'>View more</Link>
                             </div>
                        

                    <AddComment post={post} />
                </div>

            </div>
        </div>
    </div>
</section>
    })}

        {
             posts.pageNumber < posts.posts?.pageCount && <div className='d-flex'>
                <button 
                className='btn btn-primary mx-auto'
                onClick={nextFn}
                >Load more</button>
            </div>
        }
<EditPost editValue={editPost}/>
    {
    retport && <ReportModel setReport={setRetport} postId={reportPost._id} />
    }

</>
  )
}

export default PostList