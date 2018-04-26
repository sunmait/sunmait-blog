import { connect } from 'react-redux';
import * as redux from 'redux';
import MyPostsPage from 'components/pages/myposts-page/MyPostsPage.jsx';
import { getPosts } from '../../../redux/modules/posts/actions.js';

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  getPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsPage);