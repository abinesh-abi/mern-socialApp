
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { getPost } from './../redux/actions/postAction'
import { getProfileUsers } from './../redux/actions/profileActions'
import { deleteDataAPI, getDataAPI, patchDataAPI,postDataAPI} from '../utils/fetchData'
import CommentBody from './CommentBody'
import AddComment from './home/AddComment' 
import EditPost from './home/EditPost'

function SavePost() {

  const {auth,posts} = useSelector(state=>state)
  const [postsList, setPostsList] = useState([])
  const [editPost,setEditPost] = useState({})
  const [forceReload, setForceReload] = useState(0)
  const dispatch = useDispatch()

//   console.log(posts?.posts[0]?.comments[0].message)
//   console.log(posts?.posts[0])



    useEffect(()=>{
        if(auth.token) getPosts() 
        // dispatch(getPost(auth.token))
        // setPostsList(posts.posts)
    },[auth.token])

    function getPosts(){
        // dispatch(getPost(auth.token))
        // setPostsList(posts.posts)
       getDataAPI('/user/post/savePost/get',auth.token).then(({data}) =>{
        setPostsList(data.data)
       }).catch(error=>console.log(error))
    }
    function removeFromSaved(postId) {
        patchDataAPI('/user/post/savePost/remove',{postId},auth.token)
        .then(({data})=>{
            getPosts()
        })
    }

   const deletePost = (id)=>{
        // swal({
        //         title: "Are you sure?",
        //         text: "Once deleted, you will not be able to recover this post !",
        //         icon: "warning",
        //         buttons: true,
        //         dangerMode: true,
        //     })
        //     .then((willDelete) => {
        //         if (willDelete) {
        //             deleteDataAPI(`/user/post/delete/${id}`,auth.token)
        //             dispatch(getPost(auth.token))
        //         }
        //     });
    }

    const likePost = (id)=>{
        console.log(id)
        patchDataAPI(`/user/post/like`,{postId:id},auth.token)
        .then(({data})=>{
            getPosts()
        }
        )
    }
    const unLikePost = (id)=>{
        patchDataAPI(`/user/post/unLike`,{postId:id},auth.token)
        .then(({data})=>{
            getPosts()
        })
    }


    function unFollow(id) {
        // patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
        // .then(({data})=>{
        //     dispatch(getProfileUsers({id:auth.user._id,auth:auth}))
        //     dispatch(getPost(auth.token))
        //     setPostsList(posts.posts)
        // })
    }

    function savePost(postId) {
        // postDataAPI('/user/post/savePost/add',{postId},auth.token)
        // .then(({data})=>{
        //     console.log(data)
        // })
        
    }
  return (
    <>
    {
    !postsList.length ? <h3 className='text-center mt-5' >No Saved Posts</h3> :
    postsList?.map((post,index)=>{
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
                                <Link className="dropdown-item" onClick={()=>removeFromSaved(post.postDetails._id)}> Remove form saved </Link>
                                {/* {
                                    auth.user._id !== post.userDetail._id ?
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

                                } */}
                            </div>
                        </div>
                        <div className="media m-0">
                            <div className="d-flex mr-3">
                                <Link to={`/profile/${post.postDetails.user}`} >
                                    {
                                        <img className="img-fluid rounded-circle" src={`http://127.0.0.1:5000/images/profile/${post.userDetail?.avatar}.jpg`} alt="User" />
                                    }
                                </Link>
                            </div>
                            <div className="media-body">
                                <p className="m-0">{post.userDetail?.fullname}</p>
                                {/* <small><span><i className="icon ion-md-pin"></i> London, England</span></small>
                                <small><span><i className="icon ion-md-time"></i> 1 hour ago</span></small> */}
                            </div>
                        </div>
                    </div>

                    <div className="cardbox-heading">
                        <img className="img-fluid" src={`http://127.0.0.1:5000/images/posts/${post?.postDetails._id}.jpg`} alt="Image"
                            width={"100%"}
                        />
                    </div>
                    <div className='cardbox-heading '>
                        <p className='text-secondary' >{post.content}</p>
                    </div>
                    <div className="cardbox-base">
                        <ul className="float-right">
                            <li><a><i className="fa fa-message"></i></a></li>
                            <li><a><em className="mr-5">{post.postDetails.comments?.length}</em></a></li>
                            {

                            }
                            <li><a onClick={e=>savePost(post.postDetails._id)}><i className="fa fa-bookmark mr-4"></i></a></li>
                        </ul>
                        <ul>
                            {
                                post.postDetails.likes?.includes(auth.user._id)?
                            <li onClick={()=>unLikePost(post.postDetails._id)}><a><i className="fa fa-heart text-danger"></i></a></li>
                                :
                            <li onClick={()=>likePost(post.postDetails._id)}><a><i className="fa fa-heart"></i></a></li>
                                
                            }
                            <li><a><span>{post.postDetails.likes?.length} Likes</span></a></li>
                        </ul>
                    </div>

                    {
                    // //  post?.userDetail?.comments[0]  && 
                    //     <>
                    //         <h5 className='text-secondary mx-3'>Comments</h5>
                    //         {/* <div className=' px-3 my-2 mx-4 pb-3 '>
                    //             <div className='d-flex'>
                    //                 <img src={`http://127.0.0.1:5000/images/profile/${post?.commentDetails[0]?.avatar}.jpg`}
                    //                 className="rounded-circle" 
                    //                 style={{width:'17px',height:'17px'}}
                    //                 alt="" />
                    //                 <small className='text-secondary px-2'>{post?.commentDetails[0]?.fullname}</small>
                    //             </div>
                    //             <div className='p-2 px-4' style={{background:'#e9e9e9'}}><small>{post?.comments[0]?.message}</small></div>
                    //             <div className="text-center pt-2">
                    //                 <Link to={`/post/${post._id}`} className='text-center'>View more</Link>
                    //             </div>
                                

                    //         </div> */}
                    //         {/* {console.log(post?.commentDetails[0].fullname,post?.comments[0].message)} */}
                    //         {/* <CommentBody  
                    //         userDetail={post?.userDetail.commentDetails[0]} 
                    //         comment={post?.comments[0]} 
                    //         postId={post._id} 
                    //         commentId={post?.comments[0].commentId}
                    //         findPosts={getPosts}
                    //          /> */}
                    //         <Link to={`/post/${post.postDetails._id}`} className='text-center'>View more</Link>
                    //     </>
                    }
                        

                    <div className="d-flex">
                         <Link  to={`/post/${post.postDetails._id}`} className='text-center mx-auto m-2 btn btn-primary'>View more</Link>
                    </div>
                    {/* <AddComment updatePost={setForceReload}  post={post} auth={auth} /> */}
                </div>

            </div>
        </div>
    </div>
</section>
    })}

<EditPost editValue={editPost}/>
</>
  )
}

export default SavePost