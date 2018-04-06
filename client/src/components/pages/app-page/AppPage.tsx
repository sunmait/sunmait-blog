import * as React from 'react';
import { Link } from 'react-router-dom';
import { Login } from 'redux/modules/login/action';
import Button from 'material-ui/Button';

import '../../../assets/styles/AppPage.less';

interface IProps {
  login: Login;
}

interface IState {
  password: string;
  login: string;
  authorized: boolean;
}

class AppPage extends React.Component<IProps, IState>  {

  redirect = () => {
    alert("To login Page!");
  }

  render() {
    return (
      <div className="main">
        <header>
          
        <Link to="/main" >
          <div className="logo"/>
          </Link>
          <div className="navigation">
            <Link to="/login" className="text">
              <Button
                  variant="raised"
                  color="primary"
                  className="button"
                  onClick={this.redirect}
                >
                  Authorize
              </Button>
            </Link>
          </div>
        </header>
        <div className="content">
          {this.props.children}
        </div>
        <footer>
          © 2018 <a href="https://sunmait.com/">Sunmait</a>
        </footer>
      </div>
    );
  }
}

export default AppPage;