import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts, setPostsFetchingStatus, clearPostsList } from 'redux/modules/posts/actions';
import { searchPostsSelector } from 'redux/selectors/filteredPosts';
import HomePage from 'components/pages/home-page/HomePage.jsx';

const mapStateToProps = state => ({
  posts: searchPostsSelector(state),
  postsFetchingStatus: state.posts.postsFetchingStatus,
  numberOfPosts: state.posts.posts.length,
  isNoMorePosts: state.posts.isNoMorePosts,
});

const mapDispatchToProps = {
  getPosts,
  setPostsFetchingStatus,
  clearPostsList,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
