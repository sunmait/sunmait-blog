import React from 'react';
import '../../../assets/styles/MyPostsPage.css';
import PostContainer from 'components/containers/post/PostContainer';
import SearchBar from 'components/containers/search-bar/SearchBar.jsx';
import store from '../../../redux/store';
const action = type => store.dispatch({type});

class MyPostsPage extends React.Component {
  componentDidMount() {
    action('GET_POSTS_SAGA');
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

export default MyPostsPage;