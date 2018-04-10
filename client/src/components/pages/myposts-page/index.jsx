import { connect } from 'react-redux';
import * as redux from 'redux';
import MyPostsPage from 'components/pages/myposts-page/MyPostsPage.jsx';

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(MyPostsPage);