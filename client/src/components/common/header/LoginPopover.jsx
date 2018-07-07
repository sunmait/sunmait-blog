import * as React from 'react';
import Button from 'components/common/button/Button.jsx';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import 'assets/styles/Popover.css';

class LoginPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
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
          openMenu: false
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClose = (event) => {
    this.props.handleClose();
  };

  renderIsAuthorisedHeader = () => {
    if ( this.props.user ) {
      return this.renderAuthorisedHeader();
    } else {
      return this.renderNotAuthorisedHeader();
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="popover"
      >
        <DialogTitle id="form-dialog-title">
          Welcome back
        </DialogTitle>
        <DialogContent className="popover__content">
          <TextField
            label="Login"
            name="login"
            margin="normal"
            color="white"
            value={this.state.login}
            onChange={this.handleInputChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            margin="normal"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </DialogContent>
        <DialogActions className="popover__actions">
          <Button
            buttonColor="primary"
            onClick={() => this.login()}  
            className="login-button-popup"
            label="Log In"
          />
        </DialogActions>
      </Dialog>
    );
  };
};

export default LoginPopover;