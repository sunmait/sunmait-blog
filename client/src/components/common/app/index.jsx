import React from 'react'
import Footer from 'components/common/footer/index.jsx';
import HeaderContainer from 'components/common/header/HeaderContainer';

const App = (props) => {
  return (
    <React.Fragment>
      <div className="app-container">
        <HeaderContainer />
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
