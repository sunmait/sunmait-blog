import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUser, updateUser, getCurrentUserPosts } from 'redux/modules/profile/actions';
import { formValueSelector } from 'redux-form';
import ProfilePage from './ProfilePage.jsx';

const userFormSelector = formValueSelector('userProfile');
const confirmFormSelector = formValueSelector('userPasswordConfirm');

const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.profile.profile,
  users: state.profile.usersById,
  userFormValues: userFormSelector(state, 'FirstName', 'LastName', 'Login'),
  confirmFormValues: confirmFormSelector(state, 'password'),
  currentUserPosts: state.profile.postsOfCurrentUser,
});

const mapDispatchToProps = {
  getUser,
  updateUser,
  getCurrentUserPosts,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilePage)
);
