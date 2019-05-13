import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

const searchBarSelector = formValueSelector('posts');

export const searchQuerySelector = state => searchBarSelector(state, 'searchQuery') || '';

export const getPostsSelector = createSelector([state => state.posts.posts], posts => posts);
export const getUserPostsSelector = createSelector([state => state.profile.postsOfCurrentUser], posts => posts);

export const getPostsFetchingStatusSelector = createSelector([state => state.posts.postsFetchingStatus], val => val);
export const getMorePostsFetchingStatusSelector = createSelector(
  [state => state.posts.morePostsFetchingStatus],
  val => val
);
