import { createSelector } from 'reselect';

const filteredPosts = (posts, user) => {
  return posts.reverse().filter(post => post.UserId === user.id)
};

export const filteredPostsForOwnUser = createSelector(
  state => state.posts.posts,
  state => state.user.user,
  filteredPosts
);