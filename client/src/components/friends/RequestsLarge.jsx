import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRequests, setRequestsPagenumber } from '../../redux/actions/friendsAction';
import { getProfileUsers } from '../../redux/actions/profileActions';
import Pagination from '../common/Pagination';
import RequestsCard from './RequestsCard';

function RequestsLarge() {
  const { auth, friends } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.token) {
      dispatch(getRequests({ pageNumber: friends.reqestsPagNumber, auth }));
    }
  }, [auth?.token, friends.reqestsPagNumber]);

  useEffect(() => {
    dispatch(getProfileUsers({ id: auth?.user?._id, auth: auth }));
  }, [auth?.token]);

  
  function previousFn() {
      dispatch(setRequestsPagenumber({pageNumber: friends.reqestsPagNumber -1}))
  }
  function nextFn() {
      dispatch(setRequestsPagenumber({pageNumber: friends.reqestsPagNumber +1}))
  }

  return (
    <div>
      <div className="mx-auto friend-div d-flex mt-4">
        {friends?.requests?.requests?.map((val, index) => {
          return (
            <div key={index}>
              <RequestsCard user={val.userDetails}/>
            </div>
          );
        })}
      </div>
      <div>
        {
           friends.requests.pageCount ? <Pagination 
            pageCount={friends.requests.pageCount} 
            pageNumber={friends.reqestsPagNumber}
            nextFn={nextFn}
            previousFn={previousFn}
            />:
            <div className='d-flex h4 my-3'>
                <p className='mx-auto'>There is no requests</p>
            </div>
        }

      </div>
    </div>
  )
}

export default RequestsLarge