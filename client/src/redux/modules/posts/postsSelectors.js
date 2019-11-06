import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

const searchBarForm = formValueSelector('posts');
const postEditFormSelector = formValueSelector('post');

export const searchQuerySelector = state => searchBarForm(state, 'searchQuery') || '';
export const getPostEditTagsSelector = state => postEditFormSelector(state, 'Tags');

export const getPostsSelector = createSelector([state => state.posts.posts], posts => posts);
export const getUserPostsSelector = createSelector([state => state.profile.postsOfCurrentUser], posts => posts);

export const searchTagsSelector = createSelector([state => state.posts.searchTags], posts => posts);

export const getPostsFetchingStatusSelector = createSelector([state => state.posts.postsFetchingStatus], val => val);
export const getMorePostsFetchingStatusSelector = createSelector(
  [state => state.posts.morePostsFetchingStatus],
  val => val
);
