import { createSelector } from 'reselect';

const findPost = (posts, postId) => {
  const post = posts.find(post => post.id === postId);
  if (post) {
    return post;
  }
  return {
    Title: '',
    Description: '',
    ImageUrl: '',
  }
};

export const findSelectedPost = createSelector(
  (posts, postId) => posts,
  (posts, postId) => postId,
  findPost
);