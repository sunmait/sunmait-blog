import { connect } from 'react-redux';
import * as redux from 'redux';
import HomePage from 'components/pages/home-page/HomePage.jsx';

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
