
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EditFromModal from "./EditFromModal";
import EditPassword from "./EditPassword";
import ImageEditModal from "./ImageEditModal";

const ProfileBody = ()=>{
  let imageStyle = {
    height: "130px",
    backgroundImage: `url("http://thewowstyle.com/wp-content/uploads/2015/01/facebook-cover-balloons-sunset-view-facebook-cover.jpg")`,
  };
  const profileStyle = {
    borderRadius: "50%",
    width: "130px",
    height: "130px",
    position: "absolute",
    left: 'calc(50% - 65px)',
    top:"60px"
  };

  let [user,setUser] = useState()
  const {id} = useParams()
  const {auth} = useSelector(state=>state)

  //  let getUsers  = ()=>{
  //      getDataAPI(`/user/${id}`,auth.token).then(data=>{
  //       setUser(data.data.user)
  //      })
  //  } 
  useEffect(()=>{
    setUser(auth.user)
    },[auth.user])


  return (
  <div className="d-flex flex-column bg-white">
    <div className="d-flex shadow-lg" style={{ position: "relative" }}>
      <div className="container" style={imageStyle}></div>
      <img
      className="img-fluid shadow"
        src={`http://127.0.0.1:5000/images/profile/${user?.avatar}.jpg`}
        style={profileStyle}
        alt=""
      />
      <Link className="fa-regular fa-pen-to-square"
       data-toggle="modal"
       data-target="#exampleModalCenter"
       style={
        {
          position:"absolute",
          left: 'calc(50% - 10px)',
          top:"155px",
        }
        }></Link>
     </div>
     <div className="row mt-5 align-self-center shadow w-100">
        <UserDetailFeild feild={'Name'} value={user?.fullname} />
        <UserDetailFeild feild={'User Name'} value={user?.username} />
        <UserDetailFeild feild={'Email'} value={user?.email} />
        <UserDetailFeild feild={'Date Of Birth'} value={new Date(user?.dob).toLocaleDateString() } />
        {
          auth.user?._id ===id ?
          <Link className="btn btn-primary mx-auto"
          data-toggle="modal"
          data-target="#editDetails"
          >Edit User Details</Link> :
          <Link className="btn btn-primary mx-auto">Follow</Link>
        }

        {
          auth.user?._id ===id ?
        <div className="col-11 col-md-12 d-flex justify-content-between mt-2 px-5">
          <div className="d-flex">
            <p>password</p>
            <Link className="fa-regular fa-pen-to-square h4 ml-4"
            data-toggle="modal"
            data-target="#editPassword"
            ></Link>
          </div>
          <p>******</p>
        </div> : ''
        }
        <UserDetailFeild feild={'Followers'} value={user?.followers.length} />
        <UserDetailFeild feild={'Followings'} value={user?.following.length} />
     </div>



{/* <!-- Modal --> */}
<ImageEditModal image={user?.avatar} />
 {user &&<EditFromModal user={user}  dob={user?.dob}/>} 
 <EditPassword   />

</div>
  )
}


export default ProfileBody

///////////////////
const UserDetailFeild =({feild,value})=>{
  return(
    <div className="col-11 col-md-12 d-flex justify-content-between mt-2 px-5">
      <p>{feild}</p>
      <p>{value}</p>
    </div>
  )
}
