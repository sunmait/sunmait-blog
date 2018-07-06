import { connect } from 'react-redux';
import UserInfoForm from './UserInfoForm.jsx';

const mapStateToProps = state => {
  return {
    initialValues: state.user.user,
  }
}

export default connect(mapStateToProps)(UserInfoForm);