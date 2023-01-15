
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDataAPI, getDataAPI, patchDataAPI,postDataAPI} from '../utils/fetchData'
import EditPost from './home/EditPost'
import config from '../utils/config'
import CopyPost from './common/CopyPost'

function SavePost() {

  const {auth,posts} = useSelector(state=>state)
  const [postsList, setPostsList] = useState([])
  const [editPost,setEditPost] = useState({})
  const [forceReload, setForceReload] = useState(0)
  const dispatch = useDispatch()



    useEffect(()=>{
        if(auth.token) getPosts() 
    },[auth.token])

    function getPosts(){
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


    const likePost = (id)=>{
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
                                <CopyPost value={`${config.CLIENT_URL}/post/${post.postDetails._id}`} />
                            </div>
                        </div>
                        <div className="media m-0">
                            <div className="d-flex mr-3">
                                <Link to={`/profile/${post.postDetails.user}`} >
                                    {
                                        <img className="img-fluid rounded-circle" src={`${config.SERVER_URL}/images/profile/${post.userDetail?.avatar}.jpg`} alt="User" />
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
                        <img className="img-fluid" src={`${config.SERVER_URL}/images/posts/${post?.postDetails._id}.jpg`} alt="Image"
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
                            
                            {/* <li><a onClick={e=>savePost(post.postDetails._id)}><i className="fa fa-bookmark mr-4"></i></a></li> */}
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