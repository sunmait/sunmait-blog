import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts } from 'redux/modules/posts/actions';
import { searchAuthUserPostsSelector } from 'redux/selectors/filteredPosts';
import MyPostsPage from 'components/pages/myposts-page/MyPostsPage.jsx';

const mapStateToProps = state => ({
  posts: searchAuthUserPostsSelector(state),
});

const mapDispatchToProps = {
  getPosts,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyPostsPage)
);
