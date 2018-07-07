import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import UserInfoForm from './UserInfoForm.jsx';

const mapStateToProps = state => {
  return {
    initialValues: state.user.user,
  }
};

export default withRouter(connect(mapStateToProps)(UserInfoForm));