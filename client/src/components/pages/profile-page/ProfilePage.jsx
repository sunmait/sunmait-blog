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
      this.state = {
        password: '',
        newpassword: '',
        id: '',
        error: false,
        newname: this.props.user.FirstName,
        newsecondName: this.props.user.LastName,
        newlogin: this.props.user.Login,
      };
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
    this.logout();
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

  render() {
    if (this.props.profile) {
      if (this.props.user && (this.props.user.id === this.props.profile.id)) {
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
                      style={
                        {
                          width: '60px',
                          height: '60px',
                          display: 'inline-block',
                        }
                      }
                    />
                    <Typography
                      type="title"
                      className="bar-username"
                      style={
                        {
                          font: 'Marker Felt',
                          fontSize: '20px',
                          display: 'inline-block',
                          marginBottom: '50px',
                          verticalAlign: 'middle',
                          marginLeft: '10px',
                          }
                        }
                    >
                      { `${this.props.user.FirstName} ${this.props.user.LastName}` }
                    </Typography>
                  </div>
                  <div>
                    <div className="container">
                      {
                        (this.state.newname.length >= 2) ?
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
                        (this.state.newsecondName.length >= 2) ?
                        <TextField
                          label="Second name"
                          name="newsecondName"
                          className="field"
                          defaultValue={this.props.profile.LastName}
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
                            defaultValue={this.props.profile.LastName}
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
                        (this.state.newlogin.length >= 5) ?
                          <TextField
                            label="Login"
                            name="newlogin"
                            className="field"
                            defaultValue={this.props.profile.Login}
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
                              defaultValue={this.props.profile.Login}
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
                    {/* <Link to="/home">
                      <Button
                        variant="raised"
                        color="primary"
                        size="small"
                        onClick={() => this.handleSubmitChanges()}
                      >
                        Save changes
                      </Button>
                    </Link> */}
                  </div>
                  {/* <TextField
                      label="Enter password..."
                      type="password"
                      name="password"
                      margin="normal"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  <div className="pass-container">
                    <TextField
                      label="New password..."
                      type="password"
                      name="newpassword"
                      className="field"
                      margin="normal"
                      value={this.state.newpassword}
                      onChange={this.handleInputChange}
                    />
                    <div className="button">
                      <Button
                        variant="raised"
                        color="primary"
                        size="small"
                        onClick={() => this.handlePasswordChange()}
                      >
                        Change
                      </Button>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
              <Footer />
          </div>
        );
      } else if (!this.props.user || this.props.profile) {
          return (
            <div className="main">
                <Header />
                <div className="content">
                  <div className="ProfilePage">

                  <div className="avatar-container">
                    <Avatar 
                      alt="Username"
                      src={this.props.profile.PhotoUrl}
                      style={
                        {
                          width: '60px',
                          height: '60px',
                          display: 'inline-block',
                        }
                      }
                    />
                    <Typography
                      type="title"
                      className="bar-username"
                      style={
                        {
                          font: 'Marker Felt',
                          fontSize: '20px',
                          display: 'inline-block',
                          marginBottom: '50px',
                          verticalAlign: 'middle',
                          marginLeft: '10px',
                          }
                        }
                    >
                      { `${this.props.profile.FirstName} ${this.props.profile.LastName}` }
                    </Typography>
                  </div>
                  </div>
                </div>
                <Footer />
            </div>
          );
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
}

export default ProfilePage;