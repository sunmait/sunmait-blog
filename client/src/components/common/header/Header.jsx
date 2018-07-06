import React from 'react';
import ButtonLink from 'components/common/button/ButtonLink.jsx';
import Button from 'components/common/button/Button.jsx';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import LoginModal from 'components/containers/login-modal/index.jsx';
import Menu from './menu/Menu.jsx';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import 'assets/styles/Header.css';
import store from '../../../redux/store';
const action = ({ type, payload }) => store.dispatch({type, payload});

const headerClass = 'header';
const bemClasses = getBEMClasses([headerClass]);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalOpen: false,
      isMenuOpen: false
    };
  }

  logout = () => {
    const refreshToken = localStorage.getItem('RefreshToken');
    action({type : 'LOGOUT_SAGA', payload: {refreshToken}});
  }

  handleOpenLoginModal = (event) => {
    this.setState({
      isLoginModalOpen: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      isLoginModalOpen: false,
      isMenuOpen: false,
    });
  };

  handleOpenMenu = (event) => {
    event.preventDefault();
    this.setState({
      isMenuOpen: true,
      anchorEl: event.currentTarget
    })
  }

  handleCloseMenu = (e) => {
    this.setState({
      isMenuOpen: false
    });
  };

  renderAuthorisedHeader() {
    return (
      <React.Fragment>
        <div className={bemClasses(null, 'for-authorised')}>
          <div className={bemClasses('create-button')}>
            <ButtonLink 
              buttonColor="primary"
              linkUrl="/addpost"
              label="Create new post"
            />
          </div>
          <div
            className={bemClasses('user-info')}
            onClick={this.handleOpenMenu}
          >
            {`${this.props.user.FirstName} ${this.props.user.LastName}`}
          </div>
          <Avatar
            alt="Username"
            src={this.props.user.PhotoUrl}
            onClick={this.handleOpenMenu}
          />
        </div>
        <Menu 
          isOpen={this.state.isMenuOpen}
          handleClose={this.handleCloseMenu}
          user={this.props.user}
          anchorEl={this.state.anchorEl}
          logout={this.logout}
        />
      </React.Fragment>
    )
  }

  renderNotAuthorisedHeader() {
    return (
      <React.Fragment>
        <Button
          buttonColor="primary"
          onClick={() => this.handleOpenLoginModal()}
          label="Log In"
        />
        <LoginModal
          isOpen={this.state.isLoginModalOpen}
          handleClose={this.handleCloseModal}
          login={this.login}
        />
      </React.Fragment>
    )
  }

  renderIsAuthorisedHeader = () => {
    if ( this.props.user ) {
      return this.renderAuthorisedHeader();
    } else {
      return this.renderNotAuthorisedHeader();
    }
  }

  render = () => {
    return (
      <header>
        <Link to="/home">
          <div className="logo"/>
        </Link>
        { this.renderIsAuthorisedHeader() }
      </header>
    );
  };
};

export default Header;