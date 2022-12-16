import React from "react";
import Community from "../../components/Community";
import ProfileBody from "../../components/profile/ProfileBody";
import Sidebar from "../../components/Sidebar";

function Profile() {


  // const [userData,setUserData] = useState()
  // useEffect(()=>{
  //   if (id === auth.user._id) {
  //     setUserData(auth.user)
  //   }
  // },[id,auth.user])
  // console.log(userData,"userdata+++++++=")

  return (
    <div className=" row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-2">
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-6 mt-3">
        <ProfileBody  />
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 rounded" style={{height:'100px'}}>
        <Community />
      </div>
    </div>
  );
}


export default Profile;
