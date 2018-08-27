import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helpers//BEMHelper';
import Post from 'components/containers/post/PostContainer';
import SearchBar from 'components/containers/search-bar/SearchBar.jsx';
import './PostsList.css';

const pageClass = 'posts-list';
const bemClasses = getBEMClasses([pageClass]);

const PostsList = props => {
  const posts = props.posts;

  if (posts.length || props.searchQuery) {
    return (
      <React.Fragment>
        <div className={bemClasses('searchbar')} data-cy={bemClasses('searchbar')}>
          <SearchBar />
        </div>
        {posts.length ? (
          <div className={bemClasses('container')}>
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div>No posts found for your request</div>
        )}
      </React.Fragment>
    );
  } else {
    return <div>This user doesn't have any posts yet</div>;
  }
};

PostsList.propTypes = {
  posts: PropTypes.array,
  searchQuery: PropTypes.string,
};

export default PostsList;
