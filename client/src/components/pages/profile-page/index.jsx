import { connect } from 'react-redux';
import * as redux from 'redux';
import ProfilePage from 'components/pages/profile-page/ProfilePage.jsx';
import { getUser, updateUser, changePassword } from 'redux/modules/profile/actions.js';
import { logout, verifyCredentials } from 'redux/modules/auth/actions.js';

const mapStateToProps = (state) => ({
  user: state.user.user,
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  getUser,
  updateUser,
  logout,
  verifyCredentials,
  changePassword,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);