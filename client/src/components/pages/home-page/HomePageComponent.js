import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { PostsListContainer } from '../../containers/postsList';
import Loader from '../../common/loader';
import { INITIAL_NUMBER_OF_POSTS } from 'redux/modules/posts/postsConstants';
import { useWindowWidth } from 'components/hooks/useWindowWidthHook';
import { getPostLazyLoadNumber } from 'redux/modules/posts/postsHelper';
import { LOADER_SIZES } from 'components/common/loader/LoaderComponent';

export const HomePage = ({
  getPosts,
  getMorePosts,
  morePostsFetchingStatus,
  numberOfPosts,
  noMorePosts,
  clearPostsList,
  setPostsFetchingStatus,
}) => {
  const width = useWindowWidth();

  useInitialLoadOfPosts(getPosts, clearPostsList, setPostsFetchingStatus);
  useLoadOfPostsOnScroll(numberOfPosts, noMorePosts, getMorePosts, width);

  return (
    <div className="content-wrapper content-wrapper--with-grey-background">
      <div className="content">
        <PostsListContainer />

        {morePostsFetchingStatus && <Loader size={LOADER_SIZES.SMALL} />}
      </div>
    </div>
  );
};

const useInitialLoadOfPosts = (getPosts, clearPostsList, setPostsFetchingStatus) => {
  return useEffect(
    () => {
      getPosts(INITIAL_NUMBER_OF_POSTS, 0);

      return () => {
        clearPostsList();
        setPostsFetchingStatus(true);
      };
    },
    [getPosts, clearPostsList, setPostsFetchingStatus]
  );
};

const useLoadOfPostsOnScroll = (numberOfPosts, noMorePosts, getMorePosts, width) => {
  return useEffect(
    () => {
      const handlerScrollToBottom = () => {
        if (
          numberOfPosts &&
          !noMorePosts &&
          document.documentElement.clientHeight + window.scrollY === document.body.scrollHeight
        ) {
          getMorePosts(getPostLazyLoadNumber(width), numberOfPosts);
        }
      };

      window.addEventListener('scroll', handlerScrollToBottom);

      return () => {
        window.removeEventListener('scroll', handlerScrollToBottom);
      };
    },
    [numberOfPosts, noMorePosts, getMorePosts, width]
  );
};

HomePage.propTypes = {
  morePostsFetchingStatus: PropTypes.bool.isRequired,

  getPosts: PropTypes.func.isRequired,
  getMorePosts: PropTypes.func.isRequired,
  setPostsFetchingStatus: PropTypes.func.isRequired,
};
