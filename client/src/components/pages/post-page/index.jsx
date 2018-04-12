import { connect } from 'react-redux';
import * as redux from 'redux';
import PostPage from 'components/pages/post-page/PostPage.jsx';

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(PostPage);