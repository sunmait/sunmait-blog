import * as React from 'react';
import { Redirect } from 'react-router-dom';
import ButtonLink from 'components/common/button/ButtonLink.jsx';
import Button from 'components/common/button/Button.jsx';
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';
import Fade from 'material-ui/transitions/Fade';
import { connect } from 'react-redux';
import * as redux from 'redux';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import LoginPopover from './LoginPopover.jsx'
import 'assets/styles/Header.less';
import store from '../../../redux/store';
const action = ({ type, payload }) => store.dispatch({type, payload});
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openMenu: false
    };
  }

  login = (login, password) => {
    action({type : 'LOGIN_SAGA', payload: {Login: login, Password: password}});
    this.setState({
      openDialog: false,
      openMenu: false
    })
  }

  logout = () => {
    const refreshToken = localStorage.getItem('RefreshToken');
    action({type : 'LOGOUT_SAGA', payload: {refreshToken}});
    this.setState({
      login: '',
      password: '',
      auth: false
    });
  }

  handleClickLogin = (event) => {
    this.setState({
      openDialog: true
    });
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };

  handleClickMenu = (event) => {
    event.preventDefault();
    this.setState({
      openMenu: true,
      anchorEl: event.currentTarget
    })
  }

  handleCloseMenu = (e) => {
    this.setState({
      openMenu: false
    });
  };

  renderAuthorisedHeader() {
    return (
      <React.Fragment>
        <div className="header-for-authorised">
          <div className="header-for-authorised--create-button">
            <ButtonLink 
              buttonColor="primary"
              linkUrl="/addpost"
              label="Create new post"
            />
          </div>
          <div
            className="header-for-authorised--user"
            onClick={this.handleClickMenu}
          >
          {
            this.props.updatedUser.FirstName ?
              `${this.props.updatedUser.FirstName} ${this.props.updatedUser.LastName}`
              :
              `${this.props.user.FirstName} ${this.props.user.LastName}`
            }
          </div>
          <Avatar
            alt="Username"
            src={this.props.user.PhotoUrl}
            onClick={this.handleClickMenu}
          />
        </div>
        <Popover
          open={this.state.openMenu}
          onClose={this.handleCloseMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{"horizontal":"middle","vertical":"bottom"}}
          targetOrigin={{"horizontal":"middle","vertical":"top"}}
        >
          <Link to={`/profile/:${this.props.user.id}`}>
            <MenuItem onClick={this.handleCloseMenu}>
              Profile
            </MenuItem>
          </Link>
          <Link to="/myposts">
            <MenuItem onClick={this.handleCloseMenu}>
              My posts
            </MenuItem>
          </Link>
          <Link to="/addpost">
            <MenuItem onClick={this.handleCloseMenu}>
              Add post
            </MenuItem>
          </Link>
          <MenuItem onClick={this.logout}>
            <Link to="/home">
              Log Out
            </Link>
          </MenuItem>
        </Popover>
      </React.Fragment>
    )
  }

  renderNotAuthorisedHeader() {
    return (
      <React.Fragment>
        <Button
          buttonColor="primary"
          onClick={() => this.handleClickLogin()}
          className="login-button"
          label="Log In"
        />
        <LoginPopover
          isOpen={this.state.openDialog}
          handleClose={this.handleClose}
          login={this.login}
          user={this.props.user}
        />
      </React.Fragment>
    )
  }

  renderIsAuthorisedHeader = () => {
    if ( this.props.user ) {
      return this.renderAuthorisedHeader();
    } else {
      return this.renderNotAuthorisedHeader();
    }
  }

  render = () => {
    return (
      <header>
        <Link to="/home">
          <div className="logo"/>
        </Link>
        { this.renderIsAuthorisedHeader() }
      </header>
    );
  };
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  updatedUser: state.profile.updatedUser
});

export default connect(mapStateToProps)(Header);