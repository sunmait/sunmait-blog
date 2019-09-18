import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CommentsList } from './CommentsListComponent';
import {
  getCommentsSelector,
  getCommentsFetchingStatusSelector,
  addCommentsFetchingStatusSelector,
} from 'redux/modules/comments/commentsSelectors';

const mapStateToProps = state => {
  return {
    comments: getCommentsSelector(state),
    getFetchingStatus: getCommentsFetchingStatusSelector(state),
    addFetchingStatus: addCommentsFetchingStatusSelector(state),
  };
};

const withConnect = connect(mapStateToProps);

export const CommentsListContainer = compose(
  withRouter,
  withConnect
)(CommentsList);
