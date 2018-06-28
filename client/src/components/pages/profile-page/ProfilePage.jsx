import * as React from 'react';
import '../../../assets/styles/ProfilePage.less';
import Header from 'components/common/header/Header.jsx';
import { Link } from 'react-router-dom';
import Footer from 'components/common/footer/index.jsx';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('User'));
    this.state = {
      password: '',
      id: '',
      openDialog: false
    }
    if (user) {
      this.state = {
        newname: user.FirstName,
        newsecondName: user.LastName,
        newlogin: user.Login,
      };
    }
  }

  componentWillMount() {
    const userId = +this.props.location.pathname.split(':')[1];
    this.props.getUser(userId);
    this.setState({
      id: userId,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitChanges = () => {
    this.setState({
      openDialog: true
    });
  }

  change = () => {
      this.props.login(this.props.user.Login, this.state.password
      ).then((res) => {
        this.props.updateUser(
          this.state.id,
          this.state.newname,
          this.state.newsecondName,
          this.state.newlogin
        ).then(
          (res) => {
            this.logout();
            this.props.login(this.state.newlogin, this.state.password);
            this.props.history.push('/home');
          });
      },
      (rej) => {
        alert("Wrong password");
      });
  }

  logout = () => {
    const refToken = localStorage.getItem('RefreshToken');
    this.props.logout(refToken);
  }

  handleClose = (event) => {
    this.setState({
      openDialog: false
    });
  };

  renderAuthorisedProfile = () => {
    let helperTextName = "";
    let helperTextSecondName = "";
    let helperTextLogin = "";
    let errorName = false;
    let errorSecondName = false;
    let errorLogin = false;
    let disabledButton = false;
    if (this.state.newname.length < 2) {
      helperTextName = "min length: 2 symbols";
      errorName = true;
    }
    if (this.state.newsecondName.length < 2) {
      helperTextSecondName = "min length: 2 symbols";
      errorSecondName = true;
    }
    if (this.state.newlogin.length < 5) {
      helperTextLogin = "min length: 5 symbols";
      errorLogin = true;
    }
    if ((this.state.newname.length < 2) || (this.state.newlogin.length < 5) || (this.state.newsecondName.length < 2)) {
      disabledButton = true;
    }
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div className="ProfilePage">
            <div className="form">
              <div className="avatar-container">
                <Avatar 
                  alt="Username"
                  src={this.props.user.PhotoUrl}
                  className="avatar"
                />
                <Typography
                  type="title"
                  className="bar-username"
                >
                  {this.props.user.FirstName} {this.props.user.LastName}
                </Typography>
              </div>
              <div>
                <div className="container">
                  <TextField
                    error={ errorName }
                    label="Name"
                    name="newname"
                    className="field"
                    value={ this.state.newname }
                    helperText={ helperTextName }
                    onChange={this.handleInputChange}
                    margin="normal"
                  />
                </div>
              </div>
              <div>
                <div className="container">
                  <TextField
                    error={ errorSecondName }
                    label="Second name"
                    name="newsecondName"
                    className="field"
                    helperText={ helperTextSecondName }
                    value={ this.state.newsecondName}
                    onChange={this.handleInputChange}
                    margin="normal"
                  />
                </div>
              </div>
              <div>
                <div className="container">
                  <TextField
                    error={ errorLogin }
                    label="Login"
                    name="newlogin"
                    className="field"
                    helperText={ helperTextLogin }
                    value={this.state.newlogin}
                    onChange={this.handleInputChange}
                    margin="normal"
                  />
                </div>
              </div>
              <div className="button change">
                <Button
                  variant="raised"
                  color="primary"
                  size="small"
                  disabled={ disabledButton }
                  onClick={() => this.handleSubmitChanges()}
                >
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            Enter your password
          </DialogTitle>
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
              onClick={() => this.change()}
              className="login-button-popup"
            >
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  renderNotAuthorisedProfile = () => {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div className="ProfilePage">
            <div className="avatar-container">
              <Avatar 
                alt="Username"
                src={this.props.profile.PhotoUrl}
                className="avatar"
              />
              <Typography
                type="title"
                className="bar-username"
              >
                {this.props.profile.FirstName} {this.props.profile.LastName}
              </Typography>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  renderProfile = () => {
    if (this.props.profile) {
      if (this.props.user && (this.props.user.id === this.props.profile.id)) {
        return this.renderAuthorisedProfile();
      } else if (!this.props.user || this.props.profile) {
        return this.renderNotAuthorisedProfile();
      }
    } else {
      return (
        <div />
      );
    }
  }

  render = () => {
    return this.renderProfile();
  }
}

export default ProfilePage;