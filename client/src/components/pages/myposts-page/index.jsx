import { connect } from 'react-redux';
import { filteredPostsForOwnUser } from 'redux/selectors/filteredPostsForOwnUser';
import MyPostsPage from 'components/pages/myposts-page/MyPostsPage.jsx';

const mapStateToProps = state => ({
  user: state.user,
  posts: filteredPostsForOwnUser(state)
});

export default connect(mapStateToProps)(MyPostsPage);