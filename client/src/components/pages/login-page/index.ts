import { connect } from 'react-redux';
import * as redux from 'redux';
import LoginPage from './LoginPage';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);