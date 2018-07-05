import * as React from 'react';
import Footer from 'components/common/footer/index.jsx';

const App = (props) => {
  return (
    <React.Fragment>
      <div className="app-container">
        {props.children}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
