import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserInfoForm from './UserInfoForm.jsx';

const mapStateToProps = state => ({
  initialValues: state.profile.profile,
});

export default withRouter(connect(mapStateToProps)(UserInfoForm));
