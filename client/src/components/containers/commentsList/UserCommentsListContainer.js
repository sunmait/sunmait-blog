import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CommentsList } from './CommentsListComponent';
import { getUserCommentsSelector } from 'redux/modules/comments/commentsSelectors';

const mapStateToProps = state => {
  return {
    comments: getUserCommentsSelector(state),
  };
};

const withConnect = connect(mapStateToProps);

export const UserCommentsListContainer = compose(
  withRouter,
  withConnect
)(CommentsList);
