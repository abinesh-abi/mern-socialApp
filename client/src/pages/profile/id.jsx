import React from "react";
import Community from "../../components/Community";
import ProfileBody from "../../components/profile/ProfileBody";
import Sidebar from "../../components/Sidebar";

function Profile() {
  return (
    <div className=" row justify-content-center">
      {/* side bar */}
      <div className="col-11 col-md-3">
        <Sidebar />
      </div>
      {/* body */}
      <div className="col-12 col-md-4 mt-3">
        <ProfileBody  />
      </div>
      {/* friends */}
      <div className="col-11 col-md-3 rounded">
        <Community />
      </div>
    </div>
  );
}


export default Profile;
