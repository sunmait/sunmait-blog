import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getPosts, getMorePosts, setPostsFetchingStatus, clearPostsList } from 'redux/modules/posts/postsActions';
import { getMorePostsFetchingStatusSelector } from 'redux/modules/posts/postsSelectors';
import { HomePage } from 'components/pages/home-page/HomePageComponent';

const mapStateToProps = state => ({
  morePostsFetchingStatus: getMorePostsFetchingStatusSelector(state),
  numberOfPosts: state.posts.posts.length,
  noMorePosts: state.posts.noMorePosts,
});

const mapDispatchToProps = {
  getPosts,
  getMorePosts,
  setPostsFetchingStatus,
  clearPostsList,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const HomePageContainer = withRouter(compose(withConnect)(HomePage));
