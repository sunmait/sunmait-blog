import React from 'react';
import PropTypes from 'prop-types';

import { getBEMClasses } from 'helpers//BEMHelper';
import Post from 'components/containers/post/PostContainer';
import { PostSearchBar } from 'components/containers/post-search-bar';
import Loader from 'components/common/loader';

import './PostsList.css';

const pageClass = 'posts-list';
const bemClasses = getBEMClasses([pageClass]);

export const PostsList = ({ posts, fetching }) => {
  return (
    <React.Fragment>
      <div className={bemClasses('searchbar')} data-cy={bemClasses('searchbar')}>
        <PostSearchBar />
      </div>

      {fetching && <Loader />}

      {!fetching && posts.length ? (
        <div className={bemClasses('container')} data-cy="main-page-post">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div data-cy="no-posts-message">No posts</div>
      )}
    </React.Fragment>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};
