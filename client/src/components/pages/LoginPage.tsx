import * as React from 'react';


class LoginPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  loginChange = (event: any) => {
    this.setState({
      login: event.target.value,
    });
  }

  passwordChange = (event: any) => {
    this.setState({
      password: event.target.value,
    });
  }

  login = () => {
    alert("You are autorized!");
  }

  render() {
    return (
      <div className="LoginPage">
        <h2 className="title">
          Please enter your login and password:
        </h2>
        <div>
          <input type="text" placeholder="Login..." className="field" onChange={this.loginChange} />
        </div>
        <div>
          <input type="password" placeholder="Password..." className="field" onChange={this.passwordChange} />
        </div>
          <button onClick={this.login}> Login </button>
      </div>
    );
  }
}

export default LoginPage;