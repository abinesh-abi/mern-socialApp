import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUsers } from "../../redux/actions/adminAction";
import Pagination from "../common/Pagination";
import Search from "../common/Search";
import UserTable from "./UserTable";

function UserComponent() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState('')

  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUsers({ pageNumber }));
  }, [pageNumber, dispatch]);

  useEffect(()=>{
    dispatch(searchUsers({value:searchInput}))
  },[searchInput])

  function previousFn() {
    setPageNumber((val) => val - 1);
  }
  function nextFn() {
    setPageNumber((val) => val + 1);
  }

  return (
    <>
      <div>
        <div className="d-flex flex-row-reverse">
          <Search value={searchInput} setValue={setSearchInput} />
        </div>
        <UserTable pageNumber={pageNumber} />
        {
          !admin.searchUsers && <Pagination
            pageCount={admin?.users?.pageCount}
            pageNumber={pageNumber}
            previousFn={previousFn}
            nextFn={nextFn}
          />
        }
      </div>
    </>
  );
}

export default UserComponent;
