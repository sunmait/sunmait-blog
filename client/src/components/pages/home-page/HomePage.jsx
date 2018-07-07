import * as React from 'react';
import 'assets/styles/HomePage.css';
import Header from 'components/common/header/Header.jsx';
import Posts from 'components/common/postsContainer/index.jsx';
import Footer from 'components/common/footer/index.jsx';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <Posts history={this.props.history}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;