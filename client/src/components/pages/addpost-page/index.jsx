import { connect } from 'react-redux';
import * as redux from 'redux';
import AddPostPage from 'components/pages/addpost-page/AddPostPage.jsx';

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(AddPostPage);