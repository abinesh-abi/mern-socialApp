import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { getPost } from '../../redux/actions/postAction'
import { getProfileUsers } from '../../redux/actions/profileActions'
import config from '../../utils/config'
import { deleteDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import CommentBody from '../CommentBody'
import AddComment from './AddComment'
import EditPost from './EditPost'
import ReportModel from './ReportModel'

function ViewPosts() {
  const {auth , profile} =  useSelector(state=>state)
  
  const [post, setPost] = useState([])
  const [editPost,setEditPost] = useState({})
  const [report, setReport] = useState(false)
  const [reportPost, setReportPost] = useState()

  const dispatch = useDispatch()
  const navigator = useNavigate()
  let {id} = useParams()



    function findPosts() {
    auth.token && postDataAPI(`/user/post/${id}`,{},auth.token)
    .then(({data})=>{
      setPost(data.data)
    })
  }
    useEffect(()=>{
       findPosts()
    },[auth.token,])

    const like = (id)=>{
        patchDataAPI(`/user/post/like`,{postId:id},auth.token)
        .then(({data})=>{
            findPosts()
        }
        )
    }
    const unLikePost = (id)=>{
        patchDataAPI(`/user/post/unLike`,{postId:id},auth.token)
        .then(({data})=>{
            findPosts()
        })
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
                    dispatch(getPost(auth.token))
                    navigator('/')
                }
            });
    }
    function savePost(postId) {
        postDataAPI('/user/post/savePost/add',{postId},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
        })
        
    }
    function removeFromSaved(postId) {
        patchDataAPI('/user/post/savePost/remove',{postId},auth.token)
        .then(({data})=>{
            dispatch(getProfileUsers({id:auth?.user?._id,auth:auth}))
        })
    }

    function unFollow(id) {
        patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
        .then(({data})=>{
          navigator('/')
        })
    }


  return (
    <>
    {
    // !post[0] ? <h3 className='text-center mt-5' >No post to show</h3> :
      <section className="profile-feed py-2" >
          <div className="">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="cardbox shadow-lg bg-white rounded">

                          <div className="cardbox-heading">
                              <div className="dropdown float-right">
                                  <button className="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                                      <em className="fa fa-ellipsis-h"></em>
                                  </button>
                                  <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style={{position: 'absolute', transform: 'translate3d(-136px, 28px, 0px)', top: "0px", left: "0px", "willChange": "transform"}}>
                                      {/* <Link className="dropdown-item" to="/">Hide post</Link> */}

                                      {
                                          auth.user?._id !== post[0]?.user ?
                                          <>
                                          <Link className="dropdown-item" onClick={()=>unFollow(post[0]?.user)}>Stop following</Link> 
                                          <Link className="dropdown-item" onClick={()=>{
                                                setReport(true)
                                                setReportPost(post)
                                            }}>Report</Link>
                                          </> :

                                          <>
                                            <Link className="dropdown-item" 
                                            data-toggle="modal" data-target="#edit-post"
                                            onClick={()=>setEditPost(post[0])}
                                            >Edit Post</Link> 
                                            <Link className="dropdown-item" 
                                            onClick={()=>deletePost(post[0]._id)}
                                            >Delete Post</Link> 
                                          </>

                                      }
                                  </div>
                              </div>
                              <div className="media m-0">
                                  <div className="d-flex mr-3">
                                      <Link to={`/profile/${post[0]?.user}`} >
                                          {
                                              <img className="img-fluid rounded-circle" src={`${config.SERVER_URL}/images/profile/${post[0]?.userDetail.avatar}.jpg`} alt="User" />
                                          }
                                      </Link>
                                  </div>
                                  <div className="media-body">
                                      <p className="m-0">{post[0]?.userDetail.fullname}</p>
                                  </div>
                              </div>
                          </div>

                          <div className="cardbox-heading">
                              <img className="img-fluid" src={`${config.SERVER_URL}/images/posts/${post[0]?._id}.jpg`} alt="Image"
                                  width={"100%"}
                              />
                          </div>
                          <div className='cardbox-heading '>
                              <p className='text-secondary' >{post[0]?.content}</p>
                          </div>
                          <div className="cardbox-base">
                              <ul className="float-right">
                                  <li><a><i className="fa fa-message"></i></a></li>
                                  <li><a><em className="mr-5">{post[0]?.comments.length && '0' || post.length}</em></a></li>

                                    {
                                        profile?.users?.saved?.includes(post[0]?._id)?
                                    <li><a onClick={e=>removeFromSaved(post[0]?._id)}><i className="fa fa-bookmark mr-4 text-success"></i></a></li>
                                    :
                                    <li><a onClick={e=>savePost(post[0]._id)}><i className="fa fa-bookmark mr-4"></i></a></li>

                                    }
                              </ul>
                              <ul>
                                  {
                                      post[0]?.likes?.includes(auth.user._id)?
                                  <li 
                                  onClick={()=>unLikePost(post[0]?._id)}
                                  ><a><i className="fa fa-heart text-danger"></i></a></li>
                                      :
                                  <li 
                                  onClick={()=>like(post[0]._id)}
                                  ><a><i className="fa fa-heart"></i></a></li>
                                      
                                  }
                                  <li><a><span>{post[0]?.likes?.length} Likes</span></a></li>
                              </ul>
                          </div>
                          <AddComment updatePost={findPosts}  post={post[0]} auth={auth} />
                          {
                            (post?.length >1 || post[0]?.comments._id) &&
                            <>
                         <h5 className='text-secondary mx-3'>Comments</h5>
                          {post.map((values,index)=>{
                            return <CommentBody key={index} 
                            userDetail={values?.commentDetails} 
                            comment={values?.comments} 
                            postId={post[0]._id} 
                            commentId={values?.comments?.commentId}
                            findPosts={findPosts}
                             />
                          })}
                            </>
                          }
                          
                      </div>

                  </div>
              </div>
          </div>
      </section>
    }

<EditPost editValue={editPost} updatePost={findPosts}/>
    {
    report && <ReportModel setReport={setReport} postId={reportPost[0]._id} />
    }
</>
  )
}

export default ViewPosts