import * as React from 'react';
import '../../../assets/styles/ProfilePage.less';
import Header from 'components/common/header/Header.jsx';
import { Link } from 'react-router-dom';
import Footer from 'components/common/footer/index.jsx';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import ChangeField from 'components/common/changeField/index.jsx';

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newlogin: '',
      newpassword: '',
      newname: '',
      newsecondName: '',
      auth: true,
      user: {
        name: "Default",
        secondName: "Default",
        login: "Default"
      }
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleNameChange = () => {
    this.setState({
      user: {
        ...this.state.user,
        name: this.state.newname,
      },
      newname: '',
    });
  }

  handleSecondNameChange = () => {
    this.setState({
      user: {
        ...this.state.user,
        secondName: this.state.newsecondName,
      },
      newsecondName: '',
    });
  }

  handleLoginChange = () => {
    this.setState({
      user: {
        ...this.state.user,
        login: this.state.newlogin,
      },
      newlogin: '',
    });
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div className="ProfilePage">
            <h2 className="title">
              Here you can change your data!
            </h2>
            <ChangeField
              changeProp="name"
              name="newname"
              changePropValue={this.state.user.name}
              changePropNewValue={this.state.newname}
              changePropOnChange={this.handleInputChange}
            />
            <div className="button">
              <Button
                variant="raised"
                color="primary"
                size="small"
                onClick={() => this.handleNameChange()}
              >
                Change
              </Button>
            </div>
            <ChangeField
              changeProp="second name"
              name="newsecondName"
              changePropValue={this.state.user.secondName}
              changePropNewValue={this.state.newsecondName}
              changePropOnChange={this.handleInputChange}
            />
            <div className="button">
              <Button
                variant="raised"
                color="primary"
                size="small"
                onClick={() => this.handleSecondNameChange()}
              >
                Change
              </Button>
            </div>
            <ChangeField
              changeProp="login"
              name="newlogin"
              changePropValue={this.state.user.login}
              changePropNewValue={this.state.newlogin}
              changePropOnChange={this.handleInputChange}
            />
            <div className="button">
              <Button
                variant="raised"
                color="primary"
                size="small"
                onClick={() => this.handleLoginChange()}
              >
                Change
              </Button>
            </div>
            <div className="pass-container">
              <TextField
                label="New password..."
                type="password"
                name="password"
                className="pass-field"
                margin="normal"
                value={this.state.newpassword}
                onChange={this.newPasswordChange}
              />
              <div className="button">
                <Button
                  variant="raised"
                  color="primary"
                  size="small"
                  onClick={() => this.login()}
                >
                  Change
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;