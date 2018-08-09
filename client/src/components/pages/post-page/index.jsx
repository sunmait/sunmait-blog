import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts } from 'redux/modules/posts/actions';
import { deletePost } from 'redux/modules/posts/actions';
import PostPage from './PostPage.jsx';

const mapStateToProps = (state, props) => {
  const postId = Number(props.match.params.postId);

  return {
    selectedPost: state.posts.posts.find(post => post.id === postId),
    users: state.profile.usersById,
    user: state.user.user || {},
  };
};

const mapDispatchToProps = {
  getPosts,
  deletePost,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostPage)
);
