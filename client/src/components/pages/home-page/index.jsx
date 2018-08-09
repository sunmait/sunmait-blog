import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts } from 'redux/modules/posts/actions';
import { searchPostsSelector } from 'redux/selectors/filteredPosts';
import HomePage from 'components/pages/home-page/HomePage.jsx';

const mapStateToProps = state => ({
  posts: searchPostsSelector(state),
});

const mapDispatchToProps = {
  getPosts,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
