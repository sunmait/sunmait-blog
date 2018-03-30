import * as React from 'react';
import 'assets/styles/LoginPage.less';

interface IProps {
}

interface IState {
}

export default class LoginPage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  private loginChange = (event: any) => {
    this.setState({
      login: event.target.value,
    });
  }

  private passwordChange = (event: any) => {
    this.setState({
      password: event.target.value,
    });
  }

  private login = () => {
    alert('You are autorized!');
  }

  public render() {
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
