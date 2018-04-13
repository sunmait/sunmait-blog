import * as React from 'react';
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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      openDialog: false,
      openMenu: false
    };
  }

  handleInputChange = (event) => {
    this.setState({
     [event.target.name]: event.target.value
    });
  }

  login = () => {
    try{
      this.props.login(this.state.login, this.state.password);
      console.log(this.props);
      this.setState({
        openDialog: false,
      })
    }catch (err){
      this.props.logout();
    }
  }

  logout = () => {
    this.props.logout();
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

  render = () => {
    console.log(this.props.user);
    let path = null;
    if(this.props.user) {path = this.props.user.PhotoUrl;}
    return (
      <header>
        <Link to="/home">
          <div className="logo"/>
        </Link>
            {
              this.props.user ? 
              <div>
              <Button 
                variant="fab" 
                color="primary" 
                aria-label="add" 
                onClick={this.handleClickMenu} 
                style={{
                  marginRight: '150px',
                  marginTop: '10px',
                  float: 'right',
                }}
              />
                    <Popover
                      open={this.state.openMenu}
                      onClose={this.handleCloseMenu}
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{"horizontal":"middle","vertical":"bottom"}}
                      targetOrigin={{"horizontal":"middle","vertical":"top"}}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My posts</MenuItem>
                      <MenuItem onClick={this.handleClose}>Add posts</MenuItem>
                      <MenuItem onClick={this.logout}>Log Out</MenuItem>
                    </Popover>
                </div>
              : 
              <div>
                <Button
                variant="raised"
                color="primary"
                onClick={() => this.handleClickLogin()}
                style={{
                  marginLeft: '20px',
                  marginRight: '140px',
                  marginTop: '15px',
                  border: '0',
                  boxShadow: '0',
                  width: '100px',
                  height: '20px',
                  float: 'right',
                  clear: 'lest',
                }}              
                >
                  LogIn
                </Button>            
                <Dialog
                  open={this.state.openDialog}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="form-dialog-title">Enter email and password</DialogTitle>
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
                    style={{
                      border: '0',
                      boxShadow: '0',
                      width: '100px',
                      height: '20px',
                      position: 'center',
                      clear: 'lest',
                    }}                 
                  >
                    LogIn
                  </Button>
                  </DialogActions>
                </Dialog>
              </div> 
            }
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