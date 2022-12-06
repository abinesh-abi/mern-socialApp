import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { patchDataAPI, postDataAPI } from '../../utils/fetchData'
import CommentBody from '../CommentBody'
import AddComment from './AddComment'
import EditPost from './EditPost'

function ViewPosts() {
  const {auth} =  useSelector(state=>state)
  
  const [post, setPost] = useState([])

  const dispatch = useDispatch()
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

    const likePost = (id)=>{
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

  return (
    <>
    {!post[0]?._id  ? <h3 className='text-center mt-5' >No post to show</h3> :
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
                                          auth.user._id !== post.user ?
                                          <>
                                          <Link className="dropdown-item" to="/">Stop following</Link> 
                                          <Link className="dropdown-item" to="/">Report</Link>
                                          </> :

                                          <>
                                            <Link className="dropdown-item" 
                                            data-toggle="modal" data-target="#edit-post"
                                            // onClick={()=>setEditPost(post)}
                                            >Edit Post</Link> 
                                            <Link className="dropdown-item" 
                                            // onClick={()=>deletePost(post._id)}
                                            >Delete Post</Link> 
                                          </>

                                      }
                                  </div>
                              </div>
                              <div className="media m-0">
                                  <div className="d-flex mr-3">
                                      <Link to={`/profile/${post[0].user}`} >
                                          {
                                              <img className="img-fluid rounded-circle" src={`http://127.0.0.1:5000/images/profile/${post[0].userDetail.avatar}.jpg`} alt="User" />
                                          }
                                      </Link>
                                  </div>
                                  <div className="media-body">
                                      <p className="m-0">{post[0].userDetail.fullname}</p>
                                      {/* <small><span><i className="icon ion-md-pin"></i> London, England</span></small>
                                      <small><span><i className="icon ion-md-time"></i> 1 hour ago</span></small> */}
                                  </div>
                              </div>
                          </div>

                          <div className="cardbox-heading">
                              <img className="img-fluid" src={`http://127.0.0.1:5000/images/posts/${post[0]?._id}.jpg`} alt="Image"
                                  width={"100%"}
                              />
                          </div>
                          <div className='cardbox-heading '>
                              <p className='text-secondary' >{post[0].content}</p>
                          </div>
                          <div className="cardbox-base">
                              <ul className="float-right">
                                  <li><a><i className="fa fa-message"></i></a></li>
                                  <li><a><em className="mr-5">{post.length}</em></a></li>
                                  <li><a><i className="fa fa-bookmark"></i></a></li>
                                  <li><a><em className="mr-3">0</em></a></li>
                              </ul>
                              <ul>
                                  {
                                      post[0].likes?.includes(auth.user._id)?
                                  <li 
                                  onClick={()=>unLikePost(post[0]._id)}
                                  ><a><i className="fa fa-heart text-danger"></i></a></li>
                                      :
                                  <li 
                                  onClick={()=>likePost(post[0]._id)}
                                  ><a><i className="fa fa-heart"></i></a></li>
                                      
                                  }
                                  {/* <li><Link to="/"><img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                                  <li><Link to="/"><img src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                                  <li><Link to="/"><img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                                  <li><Link to="/"><img src="https://images.pexels.com/photos/6962108/pexels-photo-6962108.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li> */}
                                  <li><a><span>{post[0].likes?.length} Likes</span></a></li>
                              </ul>
                          </div>
                          <AddComment updatePost={findPosts}  post={post[0]} auth={auth} />
                         <h5 className='text-secondary mx-3'>Comments</h5>
                          {
                          post.map((values,index)=>{
                            return <CommentBody key={index} userDetail={values?.commentDetails} comment={values?.comments?.message} postId={post._id} />
                          })
                          }
                          
                      </div>

                  </div>
              </div>
          </div>
      </section>
    }

<EditPost editValue={'ad'}/>
</>
  )
}

export default ViewPosts