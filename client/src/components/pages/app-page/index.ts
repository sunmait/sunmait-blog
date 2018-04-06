import { connect } from 'react-redux';
import * as redux from 'redux';
import AppPage from './AppPage';
import { login } from 'redux/modules/login/action';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  login,
}, dispatch);

export default connect(null, mapDispatchToProps)(AppPage);