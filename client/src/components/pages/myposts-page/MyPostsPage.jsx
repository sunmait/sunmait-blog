
import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helpers//BEMHelper';
import Button from 'components/common/button/Button.js'
import { Link } from 'react-router-dom';
import PostContainer from 'components/containers/post/PostContainer';
import SearchBar from 'components/containers/search-bar/SearchBar.jsx';
import 'assets/styles/PostsPages.css';

const pageClass = 'posts-page';
const bemClasses = getBEMClasses([pageClass]);

class MyPostsPage extends React.Component {
  componentDidMount() {
   this.props.getPosts();
  }

  renderPostList = () => {
    const { posts } = this.props;

    if (posts) {
      return posts.map(
        post => (
          <PostContainer
            key={post.id}
            post={post}
          />
        )
      )
    }

    return null;
  }

  render() {
    return (
      <div className="content content--with-grey-background">
        <div className={bemClasses('create-button')}>
          <Button
            as={Link}
            to="/addpost"
            buttonColor="primary"
          >
            Create new post
          </Button>
        </div>
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

MyPostsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
};


export default MyPostsPage;