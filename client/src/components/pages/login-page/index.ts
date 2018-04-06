import { connect } from 'react-redux';
import * as redux from 'redux';
import LoginPage from './LoginPage';
import { login } from 'redux/modules/login/action';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  login,
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);