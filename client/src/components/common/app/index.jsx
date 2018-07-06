import React from 'react'
import Footer from 'components/common/footer/index.jsx';
import Header from 'components/common/header/index.jsx';

const App = (props) => {
  return (
    <React.Fragment>
      <div className="app-container">
        <Header />
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
