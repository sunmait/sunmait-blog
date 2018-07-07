import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts } from 'redux/modules/posts/actions';
import PostPage from 'components/pages/post-page/PostPage.jsx';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  user: state.user.user,
});

const mapDispatchToProps = {
  getPosts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
