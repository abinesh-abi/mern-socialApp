import React from 'react'
import '../../styles/posts.css'
import Addpost from './Addpost';
import PostList from './PostList';

function HomeBody() {

  return (
      <div className=''>
        <Addpost />
        <PostList />
      </div>
  )
}

export default HomeBody