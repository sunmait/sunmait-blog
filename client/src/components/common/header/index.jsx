import * as React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { Login } from 'redux/modules/auth/actions';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      authorized: this.props.auth,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  login = () => {
    document.getElementById('myModalLogin').style.display = "none";
    this.setState({
      authorized: true,
    });
  }

  logout = () => {
    document.getElementById('myModalProfile').style.display = "none";
    this.setState({
      login: '',
      password: '',
      authorized: false,
    });
  }

  componentDidMount() {
    window.onclick = function(event) {
      if (event.target === document.getElementById('myModalLogin')) {
        document.getElementById('myModalLogin').style.display = "none";
      } else if (event.target === document.getElementById('myModalProfile')) {
        document.getElementById('myModalProfile').style.display = "none";
      }
    }
  }

  showLoginForm = (event) => {
    console.log(this.state.login);
    document.getElementById('myModalLogin').style.display = "block";
  };

  closeLoginForm = (event) => {
    document.getElementById('myModalLogin').style.display = "none";
    this.setState({
      login: '',
      password: '',
    });
  };

  showProfileForm = (event) => {
    document.getElementById('myModalProfile').style.display = "block";
  };

  closeProfileForm = (event) => {
    document.getElementById('myModalProfile').style.display = "none";
  };

  renderNotAuthorized = () => {
    return (
      <div>
        <header>
          <Link to="/home">
            <div className="logo"/>
          </Link>
          <div className="navigation button">
            <Button
              variant="raised"
              color="primary"
              size="large"
              onClick={() => this.showLoginForm()}
            >
              Login
            </Button>
          </div>
        </header>

        <div id="myModalLogin" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <span class="close" onClick={() => this.closeLoginForm()}>
                &times;
              </span>
              <h2>
                Please enter your login and password:
              </h2>
            </div>
            <div class="modal-body">
              <div>
                <TextField
                  label="Enter login..."
                  name="login"
                  margin="normal"
                  color="white"
                  value={this.state.login}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <TextField
                  label="Enter password..."
                  type="password"
                  name="password"
                  margin="normal"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="button">
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.login()}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  renderAuthorized = () => {
    return (
      <div>
        <header>
          <Link to="/home">
            <div className="logo"/>
          </Link>
            <div className="navigation button">
              <Button
                variant="raised"
                color="primary"
                size="large"
                onClick={() => this.showProfileForm()}
              >
                {
                  this.props.login ?
                    this.props.login
                  :
                    this.state.login
                }
              </Button>
          </div>
        </header>

        <div id="myModalProfile" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <span class="close" onClick={() => this.closeProfileForm()}>
                &times;
              </span>
              <h2>
                {
                  this.props.login ?
                    this.props.login
                  :
                    this.state.login
                }
              </h2>
            </div>
            <div class="modal-body">
              <div className="profile-navigation">
                <div className="button">
                  <Link to="/profile">
                    <Button
                      variant="raised"
                      color="primary"
                      size="medium"
                    >
                      Profile
                    </Button>
                  </Link>
                </div>
                <div className="button">
                  <Link to="/myposts">
                    <Button
                      variant="raised"
                      color="primary"
                      size="medium"
                    >
                      My posts
                    </Button>
                  </Link>
                </div>
                <div className="button">
                  <Link to="/addpost">
                    <Button
                      variant="raised"
                      color="primary"
                      size="medium"
                    >
                      Add post
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="button logout">
                <Button
                  variant="raised"
                  color="primary"
                  size="medium"
                  onClick={() => this.logout()}
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  render = () => {
    if (this.state.authorized) {
      return this.renderAuthorized();
    }
    return this.renderNotAuthorized();
  }
};

export default Header;