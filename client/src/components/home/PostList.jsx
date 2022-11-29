import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { getPost } from '../../redux/actions/postAction'
import { deleteDataAPI, getDataAPI, postDataAPI } from '../../utils/fetchData'

function PostList() {

  const {auth,posts} = useSelector(state=>state)
  const [postsList, setPostsList] = useState([])
  const dispatch = useDispatch()

    // function getPosts(){
    //    postDataAPI(`/user/posts`,{},auth.token).then(({data}) =>{
    //     setPosts(data.data)
    //    })
    // }


    useEffect(()=>{
        // getPosts()
        dispatch(getPost(auth.token))
        setPostsList(posts.posts)
    },[dispatch,posts.posts.length])

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
                }
            });
    }

  return (
    <>
    {!postsList.length ? <h3 className='text-center mt-5' >No post to show</h3> :
    postsList.map((post,index)=>{
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
                                     <Link className="dropdown-item" to="/">Stop following</Link> 
                                     <Link className="dropdown-item" to="/">Report</Link>
                                    </> :

                                     <>
                                      <Link className="dropdown-item" to="/">Edit Post</Link> 
                                      <Link className="dropdown-item" onClick={()=>deletePost(post._id)}>Delete Post</Link> 
                                    </>

                                }
                            </div>
                        </div>
                        <div className="media m-0">
                            <div className="d-flex mr-3">
                                <a href=""><img className="img-fluid rounded-circle" src={`http://127.0.0.1:5000/images/profile/${post?.user}.jpg`} alt="User" /></a>
                            </div>
                            <div className="media-body">
                                <p className="m-0">{auth.user.fullname}</p>
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
                            <li><a><em className="mr-5">0</em></a></li>
                            <li><a><i className="fa fa-share"></i></a></li>
                            <li><a><em className="mr-3">{post.comments.length}</em></a></li>
                        </ul>
                        <ul>
                            <li><a><i className="fa fa-thumbs-up"></i></a></li>
                            {/* <li><Link to="/"><img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                            <li><Link to="/"><img src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                            <li><Link to="/"><img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                            <li><Link to="/"><img src="https://images.pexels.com/photos/6962108/pexels-photo-6962108.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li> */}
                            <li><a><span>{post.likes.length} Likes</span></a></li>
                        </ul>
                    </div>
                    <div className='d-flex px-3 my-2 pb-3'>
                        <div>
                        <img src={`http://127.0.0.1:5000/images/profile/${auth?.user?.avatar}.jpg`}
                         className="rounded-circle" 
                         style={{width:'55px'}}
                         alt="" />
                        </div>
                         <input type="text" className='form-control mt-2 mx-3' placeholder='add comment' style={{top:'10px'}} />
                        <div>
                             <i className="fa fa-rocket h2 text-secondary mt-2 mx-3"></i>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</section>
    })}



{/* <section className="profile-feed py-2" >
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
                                <Link className="dropdown-item" to="/">Hide post</Link>
                                <Link className="dropdown-item" to="/">Stop following</Link>
                                <Link className="dropdown-item" to="/">Report</Link>
                            </div>
                        </div>
                        <div className="media m-0">
                            <div className="d-flex mr-3">
                                <a href=""><img className="img-fluid rounded-circle" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" alt="User" /></a>
                            </div>
                            <div className="media-body">
                                <p className="m-0">Emma Robinson</p>
                            </div>
                        </div>
                    </div>

                    <div className="cardbox-heading">
                        <img className="img-fluid" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bandt.com.au%2Finformation%2Fuploads%2F2015%2F09%2Fgetty3.jpg&f=1&nofb=1&ipt=9cc6fe9c6ad0b636dc6f01545321e6721d0c537562a9a5a3319cd3b7853cb331&ipo=images" alt="Image" />
                    </div>
                    <div className="cardbox-base">
                        <ul className="float-right">
                            <li><a><i className="fa fa-message"></i></a></li>
                            <li><a><em className="mr-5">46</em></a></li>
                            <li><a><i className="fa fa-share"></i></a></li>
                            <li><a><em className="mr-3">05</em></a></li>
                        </ul>
                        <ul>
                            <li><a><i className="fa fa-thumbs-up"></i></a></li>
                            <li><Link to="/"><img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                            <li><Link to="/"><img src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                            <li><Link to="/"><img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                            <li><Link to="/"><img src="https://images.pexels.com/photos/6962108/pexels-photo-6962108.jpeg" className="img-fluid rounded-circle" alt="User" /></Link></li>
                            <li><a><span>242 Likes</span></a></li>
                        </ul>
                    </div>
                    <div className='d-flex px-3 my-2'>
                        <div>
                        <img src={`http://127.0.0.1:5000/images/profile/${auth?.user?.avatar}.jpg`}
                         className="rounded-circle" 
                         style={{width:'55px'}}
                         alt="" />
                        </div>
                         <input type="text" className='form-control mt-2 mx-3' placeholder='add comment' style={{top:'10px'}} />
                        <div>
                             <i className="fa fa-rocket h2 text-secondary mt-2 mx-3"></i>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    </div>
</section> */}
</>
  )
}

export default PostList