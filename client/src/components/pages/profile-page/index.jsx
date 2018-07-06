import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ProfilePage from 'components/pages/profile-page/ProfilePage.jsx';

const userFormSelector = formValueSelector('userProfile');
const confirmFormSelector = formValueSelector('userPasswordConfirm');

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    profile: state.profile.profile,
    users: state.profile.usersById,
    userFormValues: userFormSelector(state, 'FirstName', 'LastName', 'Login'),
    confirmFormValues: confirmFormSelector(state, 'password')
  }
};

export default connect(mapStateToProps)(ProfilePage);