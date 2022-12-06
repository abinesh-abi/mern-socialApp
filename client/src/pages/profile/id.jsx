import React from "react";
import Followers from "../../components/Followers";
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
    <div className="container-fluid row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-2">
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-6 mt-3">
        <ProfileBody  />
      </div>
      {/* friends */}
      <div className="col-11 col-md-3" style={{height:'100px'}}>
      <Followers />
      </div>
    </div>
  );
}


export default Profile;
