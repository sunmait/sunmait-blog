import { createSelector } from 'reselect';

export const getCommentsSelector = createSelector([state => state.comments.comments], comments => comments);

export const getCommentsFetchingStatusSelector = createSelector(
  [state => state.comments.commentsFetchingStatus],
  commentsFetchingStatus => commentsFetchingStatus
);

export const addCommentsFetchingStatusSelector = createSelector(
  [state => state.comments.commentFetchingStatus],
  commentFetchingStatus => commentFetchingStatus
);

export const getUserCommentsSelector = createSelector(
  [state => state.post.commentsOfCurrentPost],
  comments => comments
);
