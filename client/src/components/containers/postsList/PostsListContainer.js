import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';

import { PostsList } from './PostsListComponent';
import { getPostsFetchingStatusSelector, getPostsSelector } from 'redux/modules/posts/postsSelectors';

const mapStateToProps = state => {
  return {
    posts: getPostsSelector(state),
    fetching: getPostsFetchingStatusSelector(state),
  };
};

const withConnect = connect(mapStateToProps);
const withForm = reduxForm({ form: 'posts' });

export const PostsListContainer = compose(
  withRouter,
  withConnect,
  withForm
)(PostsList);
