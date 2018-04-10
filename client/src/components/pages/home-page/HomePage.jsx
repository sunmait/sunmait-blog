import * as React from 'react';
import '../../../assets/styles/HomePage.less';
import Header from 'components/common/header/index.jsx';
import Posts from 'components/common/postsContainer/index.jsx';
import Footer from 'components/common/footer/index.jsx';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false,
    };
  }

  render() {
    return (
      <div className="main">
        <Header auth={this.state.auth} />
        <div className="content">
          <div>
            <Posts />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;