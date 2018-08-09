import { connect } from 'react-redux';
import { login } from 'redux/modules/auth/actions';
import LoginModal from './LoginModal.jsx';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
