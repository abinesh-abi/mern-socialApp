import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers, setFollowersPagenumber } from "../../redux/actions/friendsAction";
import { getProfileUsers } from "../../redux/actions/profileActions";
import Pagination from "../common/Pagination";
import FollowersCard from "./FollowersCard";

function FollowersLarge() {
  const { auth, friends } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.token) {
      dispatch(getFollowers({ pageNumber: friends.followersPageNumber, auth }));
    }
  }, [auth?.token, friends.followersPageNumber]);

  useEffect(() => {
    dispatch(getProfileUsers({ id: auth?.user?._id, auth: auth }));
  }, [auth?.token]);

  
  function previousFn() {
      dispatch(setFollowersPagenumber({pageNumber: friends.followersPageNumber -1}))
  }
  function nextFn() {
      dispatch(setFollowersPagenumber({pageNumber: friends.followersPageNumber +1}))
  }

  return (
    <div>
      <div className="mx-auto friend-div d-flex mt-4">
        {friends?.followers?.followers?.map((val, index) => {
          return (
            <div key={index}>
              <FollowersCard user={val.userDetails} />
            </div>
          );
        })}
      </div>
      <div>
        {
          friends.followers.pageCount ?
            <Pagination 
              pageCount={friends.followers.pageCount} 
              pageNumber={friends.followersPageNumber}
              nextFn={nextFn}
              previousFn={previousFn}
            /> :
            <div className='d-flex h4 my-3'>
                <p className='mx-auto'>There is no followings</p>
            </div>

        }

      </div>
    </div>
  );
}

export default FollowersLarge;
