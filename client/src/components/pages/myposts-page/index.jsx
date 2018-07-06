import { connect } from 'react-redux';
import * as redux from 'redux';
import MyPostsPage from 'components/pages/myposts-page/MyPostsPage.jsx';

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts.posts.reverse().filter((post) => post.UserId === state.user.user.id)
});

export default connect(mapStateToProps)(MyPostsPage);