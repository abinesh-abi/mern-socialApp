import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings, setFollowingsPagenumber } from "../../redux/actions/friendsAction";
import { getProfileUsers } from "../../redux/actions/profileActions";
import Pagination from "../common/Pagination";
import FollowingsCard from "./FollowingsCard";

function FollowingsLarge() {
  const { auth, friends } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.token) {
      dispatch(getFollowings({ pageNumber: friends.followingsPageNumber, auth }));
    }
  }, [auth?.token, friends.followingsPageNumber]);
    
  useEffect(() => {
    dispatch(getProfileUsers({ id: auth?.user?._id, auth: auth }));
  }, [auth?.token]);

  function previousFn() {
      dispatch(setFollowingsPagenumber({pageNumber: friends.followingsPageNumber -1}))
  }
  function nextFn() {
      dispatch(setFollowingsPagenumber({pageNumber: friends.followingsPageNumber +1}))
  }
  return (
    <div>
      <div className="mx-auto friend-div d-flex mt-4">
        {friends?.followings?.followings?.map((val, index) => {
          return (
            <div key={index}>
              <FollowingsCard user={val.userDetails}/>
            </div>
          );
        })}
      </div>
      <div>
        {
            friends.followings.pageCount ? 
                <Pagination 
                pageCount={friends.followings.pageCount} 
                pageNumber={friends.followingsPageNumber}
                nextFn={nextFn}
                previousFn={previousFn}
                /> :
                <div className='d-flex h4 my-3'>
                    <p className='mx-auto'>There is no followings</p>
                </div>
        }
      </div>
    </div>
  )
}

export default FollowingsLarge