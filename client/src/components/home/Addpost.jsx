import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createPost, getPost } from '../../redux/actions/postAction'
import { postDataAPI } from '../../utils/fetchData'

function Addpost() {
    const [image, setImage] = useState([])
    const [content, setContent] = useState('')
    const [err, setErr] = useState('')
    const {auth} = useSelector(state=>state)

  const dispatch = useDispatch()

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

  function sendPost(e) {
    e.preventDefault()
    if(image.length === 0 ){
      return setErr("Please Add Image")
    }
    let formdata= new FormData()
    formdata.append('image',image[0])
    
    postDataAPI(`/user/addPost`,{content},auth.token)
    .then(({data})=>{
      if (data.status) {
        postDataAPI(`/user/post/editImage/${data.data._id}`,formdata,auth.token)
        .then(({data})=>{
          if (!data.status)  return setErr(data.message)
          
        dispatch(getPost(auth.token))
        document.getElementById("add-post").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
        })
        setImage([])
        setContent('')
      }
    }).catch(err=>setErr('Error In upload'))

  }
  return (
<>
    <div className='px-3 bg-white p-3 rounded'>
        <div className="d-flex">
            <div className='rounded-circle'>
              <Link to={`/profile/${auth.user?._id}`}>
                <img src={`http://127.0.0.1:5000/images/profile/${auth?.user?.avatar}.jpg`}
                 style={{width:'50px',height:'50px',borderRadius: "50%"}}
                 alt="" />
              </Link>
            </div>
            <input type="text"className='form-control mt-1 mx-3' placeholder='Whats Happening' disabled />
            <Link className='btn btn-primary w-25' data-toggle="modal" data-target="#add-post">Add Post</Link>
        </div>
    </div>
    

{/* <!-- Modal --> */}
<div className="modal fade" id="add-post" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Post</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <p className="text-danger">{err}</p>
        <form onSubmit={sendPost}>
        <textarea name="desc" id="desc"  rows="4" className='form-control'
          defaultValue={content}
          onChange={e=>setContent(e.target.value)}
        ></textarea>
        {image.length !==0 && <img className='mx-auto p-3 m-3' width={400}   src={URL.createObjectURL(image[0])} alt="" />}
        <div className="d-flex">
                <i 
                className="fa-solid fa-image h3 m-3 text-secondary d-flex"
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
            <button type="submit" className="btn btn-primary m-3">Post</button>
         </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</>
    // <div className='px-3 bg-white p-3 rounded'>
    //     <div className="d-flex">
    //         <div className='rounded-circle'>
    //             <img src={`http://127.0.0.1:5000/images/profile/${auth?.user?.avatar}.jpg`}
    //              style={{width:'50px',height:'50px'}}
    //              alt="" />
    //         </div>
    //         <input type="text"className='form-control mt-1 mx-3' placeholder='Whats Happening' />
    //     </div>
    //     <div className="d-flex justify-content-around mx-3 pt-1">
    //         <div className='d-flex '>
    //             {/* <i  className="fa-solid fa-image h3 mx-3 text-secondary"></i> */}
    //             <div>
    //                 <i 
    //                 className="fa-solid fa-image h3 mx-3 text-secondary d-flex"
    //                 style={{
    //                     display:'inline-block',
    //                     position:"relative"
    //                 }}>
    //                     <input type="file"
    //                         style={{
    //                             opacity:0,
    //                             position:'absolute',
    //                             top:0,
    //                             left:0,
    //                             right:0,
    //                             bottom:0
    //                         }}
    //                     />
    //                 <p className=' text-secondary mx-4' style={{lineHeight:'30px',fontSize:'13px'}}>Image</p>
    //                 </i>
    //             </div>
    //         </div>
    //         <div className='d-flex'>
    //             <Link className='btn btn-primary'> Post </Link>
    //         </div>
    //     </div>
        
    // </div>
  )
}

export default Addpost