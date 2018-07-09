import * as React from 'react';
import '../../../assets/styles/ProfilePage.css';
import Header from 'components/common/header/Header.jsx';
import { Link } from 'react-router-dom';
import Button from 'components/common/button/Button.jsx';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import store from '../../../redux/store';
const action = ({ type, payload }) => store.dispatch({type, payload});

const userProfile = 'user-profile';
const bemClasses = getBEMClasses([userProfile]);

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
    action({type : 'GET_USER_SAGA', payload: {userId}});
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
    action({type : 'CHANGE_USER_SAGA',
    payload: {
                Login: this.props.user.Login,
                Password: this.state.password,
                changedUser: {
                  id: this.state.id,
                  name: this.state.newname,
                  secondName: this.state.newsecondName,
                  login: this.state.newlogin
                }
              }
    });
    this.props.history.push('/home');
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

  renderProfileInfo() {
    return (
      <div className={bemClasses('profile-info-block')}>
        <Avatar 
          alt="Username"
          src={this.props.profile.PhotoUrl}
          className={bemClasses('avatar')}
        />
        <div>
          {this.props.profile.FirstName} {this.props.profile.LastName}
        </div>
      </div>
    )
  }

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
              {this.renderProfileInfo()}
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
                  buttonColor="primary"
                  onClick={() => this.handleSubmitChanges()}
                  label="Save changes"
                />
              </div>
            </div>
          </div>
        </div>
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
              buttonColor="primary"
              onClick={() => this.change()}
              label="Change"
            />
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
            {this.renderProfileInfo()}
          </div>
        </div>
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