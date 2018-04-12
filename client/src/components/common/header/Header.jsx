import * as React from 'react';
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
=======
>>>>>>> cc8e932... Authentifications at first come to page
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
<<<<<<< HEAD
<<<<<<< HEAD
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import { Login } from 'redux/modules/auth/actions';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import Fade from 'material-ui/transitions/Fade';
=======
import MenuList, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import { Login } from 'redux/modules/auth/actions';
import Typography from 'material-ui/Typography';
>>>>>>> cc8e932... Authentifications at first come to page
=======
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import { Login } from 'redux/modules/auth/actions';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
>>>>>>> b04c85a... Authentification work
import { connect } from 'react-redux';
import * as redux from 'redux';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
<<<<<<< HEAD
<<<<<<< HEAD
import Paper from 'material-ui/Paper';
import Grow from 'material-ui/transitions/Grow';
=======
>>>>>>> cc8e932... Authentifications at first come to page
=======
import Paper from 'material-ui/Paper';
import Grow from 'material-ui/transitions/Grow';
>>>>>>> b04c85a... Authentification work
import { login, logout, verifyCredentials } from 'redux/modules/auth/actions.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      openDialog: false,
      openMenu: false,
<<<<<<< HEAD
<<<<<<< HEAD
      referrer: null,
=======
>>>>>>> cc8e932... Authentifications at first come to page
=======
      anchor: null
>>>>>>> b04c85a... Authentification work
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
<<<<<<< HEAD
<<<<<<< HEAD
      console.log(this.props);
      this.setState({
        openDialog: false,
=======
      this.setState({
        openDialog: false,
        auth: true,
>>>>>>> cc8e932... Authentifications at first come to page
=======
      console.log(this.props);
      this.setState({
        openDialog: false,
>>>>>>> b04c85a... Authentification work
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
<<<<<<< HEAD
      referrer: '/home'
    });    
=======
    });
>>>>>>> cc8e932... Authentifications at first come to page
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
<<<<<<< HEAD
    event.preventDefault();
    this.setState({
      openMenu: true,
      anchorEl: event.currentTarget,
    })
  }

  handleCloseMenu = (e) => {
=======
    this.setState({
      openMenu: true,
    })
  }

<<<<<<< HEAD
  handleCloseMenu = () => {
>>>>>>> cc8e932... Authentifications at first come to page
=======
  handleCloseMenu = (e) => {
>>>>>>> b04c85a... Authentification work
    this.setState({
      openMenu: false,
      anchor: e.target
    });
  };

<<<<<<< HEAD
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render = () => {
    const {referrer} = this.state;
    if (referrer) return <Redirect to={referrer} />;
=======
  render = () => {
    console.log(this.props.user);
    let path = null;
    if(this.props.user) {path = this.props.user.PhotoUrl;}
>>>>>>> cc8e932... Authentifications at first come to page
    return (
      <header>
        <Link to="/home">
          <div className="logo"/>
<<<<<<< HEAD
<<<<<<< HEAD
        </Link>
            {
              this.props.user ? 
=======
        </Link>            
            {this.props.user ? 
>>>>>>> cc8e932... Authentifications at first come to page
=======
        </Link>
            {
              this.props.user ? 
>>>>>>> b04c85a... Authentification work
              <div>
              <Button 
                variant="fab" 
                color="primary" 
                aria-label="add" 
                onClick={this.handleClickMenu} 
                style={{
<<<<<<< HEAD
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
                      <Link to="/profile"><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
                      <Link to="/myposts"><MenuItem onClick={this.handleClose}>My posts</MenuItem></Link>
                      <Link to="/addpost"><MenuItem onClick={this.handleClose}>Add posts</MenuItem></Link>
                      <MenuItem onClick={this.logout}>Log Out</MenuItem>
                    </Popover>
                </div>
              : 
              <div>
=======
                  marginLeft: '20px',
                  marginRight: '50px',
                  marginTop: '5px',
                  float: 'right',
                }}
              />
<<<<<<< HEAD
              <MenuList
                open={this.state.openMenu}
                onClose={this.handleCloseMenu}                
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My posts</MenuItem>
                <MenuItem onClick={this.handleClose}>Add posts</MenuItem>
                <MenuItem onClick={this.logout}>Log Out</MenuItem>
              </MenuList>
              </div>    
              : <div>
>>>>>>> cc8e932... Authentifications at first come to page
=======
                <div className="menupop">
                    <Popover
                      open={this.state.openMenu}
                      onClose={this.handleCloseMenu}
                      anchorEl={this.state.anchor}
                      anchorReference= 'anchorEI'
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                      }}
                      anchorPosition={{
                        top: 200,
                        left: 50990
                      }}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My posts</MenuItem>
                      <MenuItem onClick={this.handleClose}>Add posts</MenuItem>
                      <MenuItem onClick={this.logout}>Log Out</MenuItem>
                    </Popover>
                </div>
              </div>
              : 
              <div>
>>>>>>> b04c85a... Authentification work
                <Button
                variant="raised"
                color="primary"
                onClick={() => this.handleClickLogin()}
                style={{
                  marginLeft: '20px',
<<<<<<< HEAD
                  marginRight: '140px',
                  marginTop: '15px',
=======
                  marginRight: '50px',
                  marginTop: '20px',
>>>>>>> cc8e932... Authentifications at first come to page
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