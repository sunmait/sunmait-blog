import * as React from 'react';
import '../../../assets/styles/HomePage.less';
import '../../../assets/styles/MyPostsPage.less';
import Header from 'components/common/header/Header.jsx';
import Footer from 'components/common/footer/index.jsx';
import Post from 'components/common/post/index.jsx';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

class PostPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false,
    };
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div>
            <Post />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PostPage;