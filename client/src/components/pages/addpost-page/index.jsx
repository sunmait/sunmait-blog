import { connect } from 'react-redux';
import * as redux from 'redux';
import AddPostPage from 'components/pages/addpost-page/AddPostPage.jsx';
import { addPost, updatePost } from 'redux/modules/posts/actions.js';

const mapStateToProps = (state) => ({
  posts: state.posts
});
const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  addPost,
  updatePost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPostPage);