import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

const userPostsFormSelector = formValueSelector('userPosts');

export const userPostsSearchSelector = createSelector(
  [state => userPostsFormSelector(state, 'searchQuery')],
  search => search || ''
);

export const getProfileUserIdSelector = createSelector(
  [state => userPostsFormSelector(state, 'userId')],
  userId => userId
);
