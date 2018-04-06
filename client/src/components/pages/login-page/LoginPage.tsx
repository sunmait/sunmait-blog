import * as React from 'react';
// import { Redirect} from 'react-router-dom';
import '../../../assets/styles/LoginPage.less';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { Login } from 'redux/modules/login/action';

interface IProps {
  login: Login;
}

interface IState {
    password: string;
    login: string;
    authorized: boolean;
  }

export default class LoginPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      login: '',
      password: '',
      authorized: false,
    };
  }

  handleInputChange = (event: any) => {
    this.setState({
     [event.target.name]: event.target.value
    });
   }

  login = () => {
    this.setState({
      authorized: true,
    });
    alert(this.state.login + "   " + this.state.password);
  }

  render() {
    return (
      <Grid container justify="center" spacing={0}>
        <form>
          <div className="LoginPage">
            <h2 className="title">
              Please enter your login and password:
            </h2>

            <div>
              <TextField
                label="Enter login..."
                name="login"
                margin="normal"
                color="white"
                value={this.state.login}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <TextField
                label="Enter password..."
                type="password"
                name="password"
                margin="normal"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>

              <Button
                variant="raised"
                color="primary"
                className="button"
                onClick={() => this.props.login()}
              >
                <Link to="/main" className="text">
                  Login
                </Link>
              </Button>

          </div>
        </form>
      </Grid>
    );
  }
}