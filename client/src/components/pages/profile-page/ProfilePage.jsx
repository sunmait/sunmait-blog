import * as React from 'react';
import '../../../assets/styles/ProfilePage.less';
import Header from 'components/common/header/Header.jsx';
import { Link } from 'react-router-dom';
import Footer from 'components/common/footer/index.jsx';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.user) {
      if (this.props.updatedUser.FirstName) {
        this.state = {
          password: '',
          newpassword: '',
          id: '',
          error: false,
          newname: this.props.updatedUser.FirstName,
          newsecondName: this.props.updatedUser.LastName,
          newlogin: this.props.updatedUser.Login,
        };
      } else {
        this.state = {
          password: '',
          newpassword: '',
          id: '',
          error: false,
          newname: this.props.user.FirstName,
          newsecondName: this.props.user.LastName,
          newlogin: this.props.user.Login,
        };
      }
      
    } else {
      this.state = {
        password: '',
        newpassword: '',
        id: '',
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
    this.props.updateUser(
      this.state.id,
      this.state.newname,
      this.state.newsecondName,
      this.state.newlogin,
    );
  }

  logout = () => {
    const refToken = localStorage.getItem('RefreshToken');
    this.props.logout(refToken);
  }

  handlePasswordChange = () => {
    this.setState({
      newpassword: '',
    });
  }

  renderAuthorisedProfile = () => {
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
                  {
                  this.props.updatedUser.FirstName ?
                    `${this.props.updatedUser.FirstName} ${this.props.updatedUser.LastName}`
                    :
                    `${this.props.user.FirstName} ${this.props.user.LastName}`
                  }
                </Typography>
              </div>
              <div>
                <div className="container">
                  {
                    this.state.newname.length >= 2 ?
                      <TextField
                        label="Name"
                        name="newname"
                        className="field"
                        value={this.state.newname}
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                        :
                      <TextField
                        error
                        label="Name"
                        name="newname"
                        className="field"
                        helperText="min length: 2 symbols"
                        value={this.state.newname}
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                    }
                </div>
              </div>
              <div>
                <div className="container">
                  {
                    this.state.newsecondName.length >= 2 ?
                    <TextField
                      label="Second name"
                      name="newsecondName"
                      className="field"
                      value={this.state.newsecondName}
                      onChange={this.handleInputChange}
                      margin="normal"
                    />
                    :
                      <TextField
                        error
                        label="Second name"
                        name="newsecondName"
                        className="field"
                        helperText="min length: 2 symbols"
                        value={this.state.newsecondName}
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                    }
                </div>
              </div>
              <div>
                <div className="container">
                  {
                    this.state.newlogin.length >= 5 ?
                      <TextField
                        label="Login"
                        name="newlogin"
                        className="field"
                        value={this.state.newlogin}
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                    :
                      <TextField
                        error
                        label="Login"
                        name="newlogin"
                        className="field"
                        helperText="min length: 5 symbols"
                        value={this.state.newlogin}
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                    }
                </div>
              </div>
              <div className="button change">
                {
                  (this.state.newname.length < 2) || (this.state.newlogin.length < 5) || (this.state.newsecondName.length < 2) ?
                    <Button
                      variant="raised"
                      color="primary"
                      disabled
                      size="small"
                    >
                      Save changes
                    </Button>
                  :
                    <Link to="/home">
                      <Button
                        variant="raised"
                        color="primary"
                        size="small"
                        onClick={() => this.handleSubmitChanges()}
                      >
                        Save changes
                      </Button>
                    </Link>
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
                { `${this.props.profile.FirstName} ${this.props.profile.LastName}` }
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
      } else {
        return (
          <div />
        );
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