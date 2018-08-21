import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import Post from 'components/containers/post/PostContainer';
import SearchBar from 'components/containers/search-bar/SearchBar.jsx';
import './PostsList.css';

const pageClass = 'posts-list';
const bemClasses = getBEMClasses([pageClass]);

const PostsList = props => {
  const posts = props.posts;

  if (posts && posts.length) {
    return (
      <React.Fragment>
        <div className={bemClasses('searchbar')}>
          <SearchBar />
        </div>
        <div className={bemClasses('container')}>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </React.Fragment>
    );
  } else {
    return <div>This user doesn't have any posts yet</div>;
  }
};

export default PostsList;
