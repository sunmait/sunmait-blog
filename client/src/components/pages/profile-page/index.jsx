import { connect } from 'react-redux';
import {
  getUser,
  updateUser,
  getCurrentUserPosts,
  setCurrentUserPostsFetchingStatus,
} from 'redux/modules/profile/actions';
import { formValueSelector } from 'redux-form';
import { searchSelectedUserPostsSelector } from 'redux/selectors/filteredPosts';
import ProfilePage from './ProfilePage.jsx';

const userFormSelector = formValueSelector('userProfile');

const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.profile.profile,
  users: state.profile.usersById,
  userFormValues: userFormSelector(state, 'FirstName', 'LastName'),
  currentUserPosts: searchSelectedUserPostsSelector(state),
  currentUserPostsFetchingStatus: state.profile.currentUserPostsFetchingStatus,
});

const mapDispatchToProps = {
  getUser,
  updateUser,
  getCurrentUserPosts,
  setCurrentUserPostsFetchingStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
