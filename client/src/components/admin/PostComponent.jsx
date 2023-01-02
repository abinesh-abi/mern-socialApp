import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, searchPosts } from '../../redux/actions/adminAction';
import Pagination from '../common/Pagination';
import Search from '../common/Search';
import PostTable from './PostTable'

function PostComponent() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPosts({ pageNumber }));
  }, [pageNumber, dispatch]);

  useEffect(()=>{
    dispatch(searchPosts({value:searchInput}))
  },[searchInput])

  function previousFn() {
    setPageNumber((val) => val - 1);
  }
  function nextFn() {
    setPageNumber((val) => val + 1);
  }

  return (
    <div>
        <div className="d-flex flex-row-reverse">
          <Search value={searchInput} setValue={setSearchInput} />
        </div>
        <PostTable pageNumber={pageNumber}/>
        {
            !admin?.searchPosts && 
            <Pagination
                pageCount={admin?.posts?.pageCount}
                pageNumber={pageNumber}
                previousFn={previousFn}
                nextFn={nextFn}
            />
        }
        
    </div>
  )
}

export default PostComponent