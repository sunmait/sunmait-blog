import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts, setPostsFetchingStatus } from 'redux/modules/posts/actions';
import { searchPostsSelector } from 'redux/selectors/filteredPosts';
import HomePage from 'components/pages/home-page/HomePage.jsx';

const mapStateToProps = state => ({
  posts: searchPostsSelector(state),
  postsFetchingStatus: state.posts.postsFetchingStatus,
});

const mapDispatchToProps = {
  getPosts,
  setPostsFetchingStatus,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
