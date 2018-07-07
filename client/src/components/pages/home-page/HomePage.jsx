import React from 'react';
import PropTypes from 'prop-types';
import PostContainer from 'components/containers/post/PostContainer';
import 'assets/styles/HomePage.css';
import SearchBar from 'components/containers/search-bar/SearchBar.jsx';
import store from '../../../redux/store';
const action =type => store.dispatch({type});

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
      <React.Fragment>
        <div className="searchbar">
          <SearchBar />
        </div>
        <div className="list-of-articles">
          {this.renderPostList()}
        </div>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
};

export default HomePage;