import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUser, updateUser } from 'redux/modules/profile/actions';
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
});

const mapDispatchToProps = {
  getUser,
  updateUser,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilePage)
);
