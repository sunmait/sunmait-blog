import React from 'react';
import PropTypes from 'prop-types';
import PostContainer from 'components/containers/post/PostContainer';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import 'assets/styles/PostsPages.css';
import SearchBar from 'components/containers/search-bar/SearchBar.jsx';

const pageClass = 'posts-page';
const bemClasses = getBEMClasses([pageClass]);

class HomePage extends React.Component {
  componentDidMount() {
   this.props.getPosts();
  }

  renderPostList() {
    const {posts} = this.props;

    if (posts) {
      return posts.map(
        post => (
          <PostContainer
            key={post.id}
            post={post}
          />
        )
      );
    }

    return null;
  }

  render() {
    return (
      <div className="content content--with-grey-background">
        <div className={bemClasses('searchbar')}>
          <SearchBar />
        </div>
        <div className={bemClasses('list-of-articles')}>
          {this.renderPostList()}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
};

export default HomePage;