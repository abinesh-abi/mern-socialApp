
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileActions";
import { getDataAPI } from "../../utils/fetchData";
import BlockOrUnBlock from "./BlockOrUnBlock";
import EditFromModal from "./EditFromModal";
import EditPassword from "./EditPassword";
import FollowBtn from "./FollowBtn";
import ImageEditModal from "./ImageEditModal";
import '../../styles/profile.css'
import UserPosts from "./UserPosts";
import config from "../../utils/config";

const ProfileBody = ()=>{
  let imageStyle = {
    height: "130px",
    // backgroundImage: `url("http://thewowstyle.com/wp-content/uploads/2015/01/facebook-cover-balloons-sunset-view-facebook-cover.jpg")`,
  };

  const {auth ,profile} = useSelector(state=>state)
  let [user,setUser] = useState({})
  const {id} = useParams()
  let dispatch  = useDispatch()

  let ownProfile = id===auth?.user?._id

   let getUsers  = ()=>{
       getDataAPI(`/user/${id}`,auth.token).then(data=>{
        setUser(data.data.user)
       })
   } 


  useEffect(()=>{
   dispatch(getProfileUsers({id,auth})) 
      // setUser(profile?.user)
    if (ownProfile) {
      setUser(profile?.users)
    }else{
      //  getDataAPI(`/user/${id}`,auth.token).then(data=>{
      //   setUser(data.data.user)
      //  })
      getUsers()
    }
    },[profile?.users?._id,id,useParams])

  return (
  <div className="d-flex flex-column bg-white profile-container">
    <div className="d-flex image-div">
      <div className="container" style={imageStyle}></div>
      <img
      className="img-fluid shadow profileImage"
        src={`${config.SERVER_URL}/images/profile/${user?.avatar}.jpg`}
        alt=""
      />
      {
        auth.user?._id ===id ?
      <Link className="fa-regular fa-pen-to-square"
       data-toggle="modal"
       data-target="#exampleModalCenter"
       style={
        {
          position:"absolute",
          left: 'calc(50% - 10px)',
          top:"155px",
        }
        }></Link> :''
      }
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
          <div className="d-flex w-100">
            <div className="mx-auto d-flex">
              <FollowBtn updateUser={getUsers} user={user} />
              <BlockOrUnBlock user={user} />
            </div>
          </div>
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
        <UserDetailFeild feild={'Followers'} value={user?.followers?.length} />
        <UserDetailFeild feild={'Followings'} value={user?.following?.length} />
     </div>
        <UserPosts />



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
