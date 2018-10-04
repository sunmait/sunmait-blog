import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deletePost } from 'redux/modules/posts/actions';
import { getPost } from 'redux/modules/post/actions';
import PostPage from './PostPage.jsx';

const mapStateToProps = (state, props) => {
  const postId = Number(props.match.params.postId);
  const selectedPost = state.post.post && state.post.post.id === postId ? state.post.post : null;

  return {
    selectedPost,
    users: state.profile.usersById,
    user: state.user.user || {},
  };
};

const mapDispatchToProps = {
  getPost,
  deletePost,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostPage)
);
