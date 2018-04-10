import { connect } from 'react-redux';
import * as redux from 'redux';
import HomePage from 'components/pages/home-page/HomePage.jsx';

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(HomePage);