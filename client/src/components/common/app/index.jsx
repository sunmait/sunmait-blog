import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from 'components/common/footer/index.jsx';
import HeaderContainer from 'components/common/header/HeaderContainer';

const App = (props) => {
  return (
    <React.Fragment>
      <Helmet
        defaultTitle="Sunmait Blog"
        titleTemplate="Sunmait Blog - %s"
      />
      <div className="app-container">
        <HeaderContainer />
        {props.children}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
