import React from "react";
import { useSelector } from "react-redux";
import FriendsList from "../components/Followers";
import ProfileBody from "../components/profile/ProfileBody";
import Sidebar from "../components/Sidebar";

function Profile(){


  const {auth} = useSelector(state=>state)
  return (

    <div className="container-fluid row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-2">
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-6 mt-3">
        <ProfileBody user={auth} />
      </div>
      {/* friends */}
      <div className="col-11 col-md-3" style={{height:'100px'}}>
      <FriendsList />
      </div>
    </div>
  );
}

export default Profile;


// const ProfileBody = ({user})=>{
//   let imageStyle = {
//     height: "130px",
//     backgroundImage: `url("http://thewowstyle.com/wp-content/uploads/2015/01/facebook-cover-balloons-sunset-view-facebook-cover.jpg")`,
//   };
//   const profileStyle = {
//     borderRadius: "50%",
//     width: "130px",
//     height: "130px",
//     position: "absolute",
//     left: 'calc(50% - 65px)',
//     top:"60px"
//   };

//   return (
//   <div className="d-flex flex-column">
//     <div className="d-flex shadow-lg" style={{ position: "relative" }}>
//       <div className="container" style={imageStyle}></div>
//       <img
//       className="img-fluid shadow"
//         src={user?.user?.avatar}
//         style={profileStyle}
//         alt=""
//       />
//       <Link className="fa-regular fa-pen-to-square" style={
//         {
//           position:"absolute",
//           left: 'calc(50% - 10px)',
//           top:"155px",
//         }
//         }></Link>
//      </div>
//      <div className="row mt-5 align-self-center shadow w-100">
//         <UserDetailFeild feild={'Name'} value={user?.user?.fullname} />
//         <UserDetailFeild feild={'User Name'} value={user?.user?.username} />
//         <UserDetailFeild feild={'Email'} value={user?.user?.email} />
//         <UserDetailFeild feild={'Date Of Birth'} value={new Date(user?.user?.dob).toLocaleDateString() } />
//         <UserDetailFeild feild={'Followers'} value={user?.user?.followers} />
//         <UserDetailFeild feild={'Followings'} value={user?.user?.followers} />
//      </div>
// </div>
//   )
// }

// const UserDetailFeild =({feild,value})=>{
//   return(
//     <div className="col-11 col-md-12 d-flex justify-content-between mt-2 px-5">
//       <p>{feild}</p>
//       <p>{value}</p>
//     </div>
//   )
// }