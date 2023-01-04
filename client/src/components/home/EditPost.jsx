import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import { getUserPosts } from '../../redux/actions/profileActions'
import config from '../../utils/config'
import { patchDataAPI, postDataAPI } from '../../utils/fetchData'

function EditPost( {editValue,updatePost,from}) {
    const [image, setImage] = useState([])
    const [content, setContent] = useState('')
    const [err, setErr] = useState('')
    const [currentValues, setCurrentValues] = useState({})

    const {auth,posts,profile} =  useSelector(state=>state)
    const dispatch = useDispatch()


    useEffect(()=>{
        setCurrentValues(editValue)
    })

    function fileHandle(e) {
        const files = [...e.target.files]
        let err = ""
        let newImages = []
        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })
        setImage(newImages)
    }

    function editPost(e) {
        e.preventDefault()
       if(image){
        let formdata= new FormData()
        formdata.append('image',image[0])
        postDataAPI(`/user/post/editImage/${currentValues._id}`,formdata,auth.token)
        .then(({data})=>{
          if (!data.status)  return setErr(data.message)
            updatePost? updatePost() : dispatch(getPost(posts.pageNumber,auth.token))
            from === 'userPost' && dispatch(getUserPosts({id:auth.user._id,auth,pageNumber:profile.pageNumber}))
        })
       }

       if(content){
        let postId =currentValues._id
        patchDataAPI(`/user/post/editContent`,{postId,content},auth.token)
        .then(({data})=>{
          if (!data.status)  return setErr(data.message)
            updatePost? updatePost() : dispatch(getPost(posts.pageNumber,auth.token))
            from === 'userPost' && dispatch(getUserPosts({id:auth.user._id,auth,pageNumber:profile.pageNumber}))
        })
       }
        setContent('')
        let close = document.getElementById("edit-post")
        close.classList.remove("show");
        close.classList.remove( "d-block");
        close.classList.remove('fade');
        close.style.display='none'
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }


  return (
        <div className="modal fade" id="edit-post" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <p className="text-danger">{err}</p>
                <form onSubmit={editPost}>
                <textarea name="desc" id="desc"  rows="4" className='form-control'
                defaultValue={
                    content ? content :
                    currentValues.content
                }
                onChange={e=>setContent(e.target.value)}
                ></textarea>
                {image.length !==0 ?
                <img className='mx-auto p-3 m-3' width={400} height={250}  src={URL.createObjectURL(image[0])} alt="" />:
                <img className='mx-auto p-3 m-3' width={400}  height={250} src={`${config.SERVER_URL}/images/posts/${currentValues._id}.jpg`} alt="" />
                }
                <div>
                        <i 
                        className="fa-solid fa-image h3 mt-3 text-secondary d-flex"
                        style={{
                            display:'inline-block',
                            position:"relative"
                        }}>
                            <input type="file"
                            name="image"
                            id='image'
                            multiple accept='image/*'
                            onChange={fileHandle}
                                style={{
                                    opacity:0,
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                    right:0,
                                    bottom:0
                                }}
                            />
                        <p className=' text-secondary mx-4' style={{lineHeight:'30px',fontSize:'13px'}}>Image</p>
                        </i>
                        {
                            (image.length || content ) ? 
                                <div className='d-flex'>
                                 <button type="submit" className="btn btn-primary m-3 mx-auto">Post</button>
                                </div>
                            :''
                        }
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
  )
}

export default EditPost