import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { addPost, updatePost } from 'redux/modules/posts/actions'
import AddPostPage from 'components/pages/addpost-page/AddPostPage.jsx';

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = {
  addPost,
  updatePost
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPostPage));