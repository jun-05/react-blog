import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PaginationContainer from '../containers/post/PaginationContainer';

import PostListContainer from '../containers/post/PostListContainer';

function PostListPage() {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
}

export default PostListPage;
