import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { postDataAPI } from '../utils/fetchData'

function SearchModel() {

    let listDiv ={height:'50px',borderRadius: "3%",
         'position' :'relative'
}
    let listImage = {
                   borderRadius: "50%",
                   width: "40px",
                   height: "40px",
                   position: 'relative',
                   top:'4px'
                }

  const [serch, setSerch] = useState('')
  const [userList,setUserList] = useState([])
  const [serchErr, setserchErr] = useState('')
  const naviagate = useNavigate()


  const {auth} = useSelector(state=>state)

  function closeModel() {
    let modal = document.getElementById('search')
        modal.style.visibility = 'hidden'
        modal.style.opacity = '0'
  }

  function serchUser(e) {
    e.preventDefault()
    if(!serch)return
    postDataAPI(`/user/search`,{name:serch},auth.token)
      .then(({data})=>{
        setserchErr('')
        setUserList(data.users)
        if (data.users.length ===0) {
          setserchErr("No Users")
        }
      })
  }

  function clearSearch() {
    setSerch('')
    setUserList([])
  }
  function viewProfile(id) {
    naviagate(`/profile/${id}`)
    document.getElementById('search').style.display='none'
  }
  return (
<>


<div id="search" className="custom-model">
    <div className="modal__content">
        <div className=" m-3 justify-content-center">
            <div className="card  p-4">
                <p className='mx-auto'>Search</p>
                <form onSubmit={serchUser}>
                    <div className="input-group mb-1">
                    <input type="text" className="form-control"
                    defaultValue={serch}
                        onChange={e=>setSerch(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary">
                        <i className="fas fa-search"></i>
                        </button>
                    </div>
                    </div>
                </form>
                <div className="mb-3">
                <p className='mx-auto text-danger'>{serchErr}</p>
                {
                    userList.map((value,index)=>{
                    return <div onClick={()=>viewProfile(value._id)}  key={index} className=" d-flex justify-content-between shadow-sm px-3 mx-1" style={listDiv}
                    >
                            <div className='d-flex'>
                                <img
                                className="img-fluid"
                                src={`http://127.0.0.1:5000/images/profile/${value?.avatar}.jpg`}
                                style={listImage}
                                alt=""
                                />
                                <p className='mx-3' style={{'lineHeight': '45px',}}>{value.fullname}</p>
                            </div>
                        </div>
                    })
                }
                </div>
                
            </div>	
            </div>

        <Link onClick={closeModel} className="modal__close">&times;</Link>
    </div>
</div>
    </>
  )
}

export default SearchModel