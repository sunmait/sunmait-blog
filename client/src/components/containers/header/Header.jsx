import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/button/Button.js';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LoginModal from 'components/containers/login-modal/index.jsx';
import Menu from './menu/Menu.jsx';
import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Header.css';

const headerClass = 'header';
const bemClasses = getBEMClasses([headerClass]);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalOpen: false,
      isMenuOpen: false,
    };
  }

  logout = () => {
    const refreshToken = localStorage.getItem('RefreshToken');
    this.props.logout(refreshToken);
  };

  handleOpenLoginModal = event => {
    this.setState({
      isLoginModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isLoginModalOpen: false,
      isMenuOpen: false,
    });
  };

  handleOpenMenu = event => {
    event.preventDefault();
    this.setState({
      isMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleCloseMenu = e => {
    this.setState({
      isMenuOpen: false,
    });
  };

  renderAuthorisedHeader() {
    return (
      <React.Fragment>
        <div className={bemClasses(null, 'for-authorised')}>
          <div className={bemClasses('create-button')}>
            <Button as={Link} to="/addpost" buttonColor="primary" data-cy="create-post">
              Create new post
            </Button>
          </div>
          <div className={bemClasses('user-info-wrapper')} onClick={this.handleOpenMenu}>
            <div className={bemClasses('user-info-name')} data-cy={bemClasses('user-info-name')}>
              {`${this.props.user.FirstName} ${this.props.user.LastName}`}
            </div>
            <Avatar alt="Username" src={this.props.user.PhotoUrl} data-cy="avatar" />
          </div>
        </div>
        <Menu
          isOpen={this.state.isMenuOpen}
          handleClose={this.handleCloseMenu}
          user={this.props.user}
          anchorEl={this.state.anchorEl}
          logout={this.logout}
        />
      </React.Fragment>
    );
  }

  renderNotAuthorisedHeader() {
    return (
      <React.Fragment>
        <Button as="button" buttonColor="primary" onClick={() => this.handleOpenLoginModal()} data-cy="login-btn">
          Log In
        </Button>
        <LoginModal isOpen={this.state.isLoginModalOpen} handleClose={this.handleCloseModal} />
      </React.Fragment>
    );
  }

  renderHeaderForAuthorizedUser = () => {
    if (this.props.user) {
      return this.renderAuthorisedHeader();
    } else {
      return this.renderNotAuthorisedHeader();
    }
  };

  render() {
    return (
      <header>
        <Link to="/home">
          <div className={bemClasses('logo')} />
        </Link>
        {this.renderHeaderForAuthorizedUser()}
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default Header;
