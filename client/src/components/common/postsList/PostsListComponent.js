import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import Post from 'components/containers/post/PostContainer';
import './PostsList.css';

const pageClass = 'posts-list';
const bemClasses = getBEMClasses([pageClass]);

const PostsList = props => {
  const posts = props.posts;

  if (posts && posts.length) {
    return (
      <div className={bemClasses('container')}>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  } else {
    return <div>This user doesn't have any posts yet</div>;
  }
};

export default PostsList;
