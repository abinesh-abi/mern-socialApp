import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import config from '../utils/config'
import { postDataAPI } from '../utils/fetchData'

function SearchModel({setSearchOrNot}) {

  let inputFocus = useRef()

  const [serch, setSerch] = useState('')
  const [userList,setUserList] = useState([])
  const [serchErr, setserchErr] = useState('')
  const naviagate = useNavigate()


  const {auth} = useSelector(state=>state)

  useEffect(()=>{
    inputFocus.current.focus()
  },[])

  function closeModel() {
    // let modal = document.getElementById('search')
    //     modal.style.visibility = 'hidden'
    //     modal.style.opacity = '0'
    setSearchOrNot(val=>!val)
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


<div id="search" className="custom-model" style={{zIndex:'3'}}>
    <div className="modal__content">
        <div className=" m-3 justify-content-center">
            <div className="card  p-4">
                <p className='mx-auto'>Search</p>
                <form onSubmit={serchUser}>
                    <div className="input-group mb-1">
                    <input type="text" className="form-control"
                    ref={inputFocus}
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
                    return <div onClick={()=>viewProfile(value._id)}  key={index} 
                    className=" d-flex justify-content-between shadow-sm px-3 mx-1 listDiv" 
                    >
                            <div className='d-flex'>
                                <img
                                className="img-fluid listImage"
                                src={`${config.SERVER_URL}/images/profile/${value?.avatar}.jpg`}
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

        <Link onClick={closeModel} className="modal__close h2">&times;</Link>
    </div>
</div>
    </>
  )
}

export default SearchModel