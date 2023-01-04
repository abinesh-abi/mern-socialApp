import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getReports, searchPosts } from '../../redux/actions/adminAction';
import Pagination from '../common/Pagination';
import ReportTable from './ReportTable';

function ReportComponent() {
  const [pageNumber, setPageNumber] = useState(1);
//   const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state);


  useEffect(() => {
    dispatch(getReports({ pageNumber }));
  }, [pageNumber, dispatch]);

//   useEffect(()=>{
//     dispatch(searchPosts({value:searchInput}))
//   },[searchInput])

  function previousFn() {
    setPageNumber((val) => val - 1);
  }
  function nextFn() {
    setPageNumber((val) => val + 1);
  }
  return (
    <div>
    <ReportTable pageNumber={pageNumber} />
            <Pagination
                pageCount={admin?.reports?.pageCount}
                pageNumber={pageNumber}
                previousFn={previousFn}
                nextFn={nextFn}
            />
    </div>
  )
}

export default ReportComponent