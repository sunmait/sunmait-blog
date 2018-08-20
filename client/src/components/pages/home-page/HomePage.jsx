import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helpers//BEMHelper';
import SearchBar from 'components/containers/search-bar/SearchBar.jsx';
import PostsList from 'components/common/postsList';
import 'assets/styles/PostsPages.css';

const pageClass = 'posts-page';
const bemClasses = getBEMClasses([pageClass]);

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="content--with-grey-background">
        <div className="content">
          <div className={bemClasses('searchbar')}>
            <SearchBar />
          </div>
          <PostsList posts={this.props.posts} />
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
