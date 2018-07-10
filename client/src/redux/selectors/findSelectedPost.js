import { createSelector } from 'reselect';

const findPost = (posts, postId) => {
  return posts.find(post => post.id === postId)
};

export const findSelectedPost = createSelector(
  (posts, postId) => posts,
  (posts, postId) => postId,
  findPost
);