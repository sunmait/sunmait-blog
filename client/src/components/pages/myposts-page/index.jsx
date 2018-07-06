import { connect } from 'react-redux';
import { searchAuthUserPostsSelector } from 'redux/selectors/filteredPosts';
import MyPostsPage from 'components/pages/myposts-page/MyPostsPage.jsx';

const mapStateToProps = state => ({
  posts: searchAuthUserPostsSelector(state),
});

export default connect(mapStateToProps)(MyPostsPage);
