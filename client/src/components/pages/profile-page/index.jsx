import { connect } from 'react-redux';
import * as redux from 'redux';
import ProfilePage from 'components/pages/profile-page/ProfilePage.jsx';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    profile: state.profile.profile,
    users: state.profile.usersById,
    updatedUser: state.profile.updatedUser
  }
};

export default connect(mapStateToProps)(ProfilePage);