import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import { Login } from 'redux/modules/auth/actions';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import Fade from 'material-ui/transitions/Fade';
import { connect } from 'react-redux';
import * as redux from 'redux';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Grow from 'material-ui/transitions/Grow';
import { login, logout, verifyCredentials } from 'redux/modules/auth/actions.js';
import 'assets/styles/Header.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      openDialog: false,
      openMenu: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({
     [event.target.name]: event.target.value
    });
  }

  login = () => {
    this.props.login(this.state.login, this.state.password)
      .then((res) => {
        this.setState({
          openDialog: false,
          openMenu: false,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout = () => {
    const refToken = localStorage.getItem('RefreshToken');
    this.props.logout(refToken)
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      login: '',
      password: '',
      auth: false,
    });
  }

  handleClickLogin = (event) => {
    this.setState({ openDialog: true });
  };

  handleClose = (event) => {
    this.setState({
      openDialog: false,
    });
  };

  handleClickMenu = (event) => {
    event.preventDefault();
    this.setState({
      openMenu: true,
      anchorEl: event.currentTarget,
    })
  }

  handleCloseMenu = (e) => {
    this.setState({
      openMenu: false,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  renderAuthorisedHeader() {
    return (
      <div>
        <div
          onClick={this.handleClickMenu}
          className="user"
        >
          <Typography
            type="title"
            className="header-bar-username"
          >
            {`${this.props.user.FirstName} ${this.props.user.LastName}`}
          </Typography>
          <Avatar
            alt="Username"
            src={this.props.user.PhotoUrl}
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
            <MenuItem onClick={this.handleClose}>
              Profile
            </MenuItem>
          </Link>
          <Link to="/myposts">
            <MenuItem onClick={this.handleClose}>
              My posts
            </MenuItem>
          </Link>
          <Link to="/addpost">
            <MenuItem onClick={this.handleClose}>
              Add post
            </MenuItem>
          </Link>
          <MenuItem onClick={this.logout}>
            <Link to="/home">
              Log Out
            </Link>
          </MenuItem>
        </Popover>
      </div>
    )
  }

  renderNotAuthorisedHeader() {
    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.handleClickLogin()}
          className="login-button"
        >
          LogIn
        </Button>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            Enter email and password
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Enter login..."
              name="login"
              margin="normal"
              color="white"
              value={this.state.login}
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              label="Enter password..."
              type="password"
              name="password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.login()}  
              className="login-button-popup"
            >
              LogIn
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  login,
  logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);