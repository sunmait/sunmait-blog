import { connect } from 'react-redux';
import * as redux from 'redux';
import MyPostsPage from 'components/pages/myposts-page/MyPostsPage.jsx';

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsPage);