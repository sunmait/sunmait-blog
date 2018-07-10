import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {deletePost} from 'redux/modules/posts/actions';
import PostPage from './PostPage.jsx';

const mapStateToProps = (state, props) => {
  const postId = Number(props.match.params.postId);

  return ({
    posts: state.posts.posts,
    selectedPost: state.posts.posts.find(post => post.id === postId),
    users: state.profile.usersById,
    user: state.user.user
  });
}

const mapDispatchToProps = {
  deletePost
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
