import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';

import { PostsList } from './PostsListComponent';
import { getUserPostsSelector } from 'redux/modules/posts/postsSelectors';

const mapStateToProps = state => {
  return {
    posts: getUserPostsSelector(state),
    fetching: state.profile.currentUserPostsFetchingStatus,
  };
};

const withConnect = connect(mapStateToProps);
const withForm = reduxForm({ form: 'userPostsSearchBar' });

export const UserPostListContainer = compose(
  withRouter,
  withConnect,
  withForm
)(PostsList);
