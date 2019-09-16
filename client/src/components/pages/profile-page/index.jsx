import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';

import {
  getUser,
  updateUser,
  getCurrentUserPosts,
  setCurrentUserPostsFetchingStatus,
  loadUserAvatar,
} from 'redux/modules/profile/profileActions';
import { getUserPostsSelector } from 'redux/modules/posts/postsSelectors';
import { ProfilePage } from './ProfilePage.jsx';

const userFormSelector = formValueSelector('userProfile');

const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.profile.profile,
  users: state.profile.usersById,
  userFormValues: userFormSelector(state, 'FirstName', 'LastName', 'BornDate'),
  currentUserPosts: getUserPostsSelector(state),
  currentUserPostsFetchingStatus: state.profile.currentUserPostsFetchingStatus,
});

const mapDispatchToProps = {
  getUser,
  updateUser,
  loadUserAvatar,
  getCurrentUserPosts,
  setCurrentUserPostsFetchingStatus,
  setUserId: userId => change('userPosts', 'userId', userId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
