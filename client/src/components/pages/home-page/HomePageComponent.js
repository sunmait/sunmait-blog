import React from 'react';
import PropTypes from 'prop-types';

import { PostsListContainer } from '../../containers/postsList';
import Loader from '../../common/loader';
import { INITIAL_NUMBER_OF_POSTS, LAZY_LOAD_POST_NUMBER } from 'redux/modules/posts/postsConstants';
import { LOADER_SIZES } from 'components/common/loader/LoaderComponent';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getPosts(INITIAL_NUMBER_OF_POSTS, 0);
    window.addEventListener('scroll', this.handlerScrollToBottom);
  }

  componentWillUnmount() {
    this.props.clearPostsList();
    window.removeEventListener('scroll', this.handlerScrollToBottom);
    this.props.setPostsFetchingStatus(true);
  }

  handlerScrollToBottom = () => {
    if (
      this.props.numberOfPosts &&
      !this.props.noMorePosts &&
      document.documentElement.clientHeight + window.scrollY === document.body.scrollHeight
    ) {
      this.props.getMorePosts(LAZY_LOAD_POST_NUMBER, this.props.numberOfPosts);
    }
  };

  render() {
    const { morePostsFetchingStatus } = this.props;

    return (
      <div className="content-wrapper content-wrapper--with-grey-background">
        <div className="content">
          <PostsListContainer />

          {morePostsFetchingStatus && <Loader size={LOADER_SIZES.SMALL} />}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  morePostsFetchingStatus: PropTypes.bool.isRequired,

  getPosts: PropTypes.func.isRequired,
  getMorePosts: PropTypes.func.isRequired,
  setPostsFetchingStatus: PropTypes.func.isRequired,
};
