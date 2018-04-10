import { connect } from 'react-redux';
import * as redux from 'redux';
import ProfilePage from 'components/pages/profile-page/ProfilePage.jsx';

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(ProfilePage);