import { connect } from 'react-redux';
import * as redux from 'redux';
import PostPage from 'components/pages/post-page/PostPage.jsx';

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.profile.profile,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);