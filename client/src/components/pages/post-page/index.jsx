import { connect } from 'react-redux';
import PostPage from 'components/pages/post-page/PostPage.jsx';

const mapStateToProps = (state) => ({
  posts: state.posts.posts.reverse(),
  profile: state.profile.profile,
  user: state.user.user
});

export default connect(mapStateToProps)(PostPage);