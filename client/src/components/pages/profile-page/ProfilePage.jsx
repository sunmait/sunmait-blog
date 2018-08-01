import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { getBEMClasses } from 'helpers//BEMHelper';
import { Helmet } from 'react-helmet';
import UserInfoForm from './user-info-form/index.jsx';
import ConfirmationModal from './confirmation-modal/ConfirmationModal.jsx';
import '../../../assets/styles/ProfilePage.css';

const userProfile = 'user-profile';
const bemClasses = getBEMClasses([userProfile]);

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    }
  }

  componentDidMount() {
    this.reloadProfile(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.reloadProfile(newProps);
    }
  }

  reloadProfile = (props) => {
    this.props.getUser(props.match.params.userId);
  }

  handleSubmitChanges = () => {
    this.setState({
      openDialog: true
    });
  }

  change = () => {
    const { userFormValues, confirmFormValues, user } = this.props;
    const updatedUserData = {
      Login: user.Login,
      Password: confirmFormValues,
      changedUser: {
        id: user.id,
        name: userFormValues.FirstName,
        secondName: userFormValues.LastName,
        login: userFormValues.Login
      }
    };

    this.props.updateUser(updatedUserData);
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
    const { profile } = this.props;

    if (profile) {
      const fullName = `${profile.FirstName} ${profile.LastName}`;

      return (
        <div className={bemClasses('profile-info-block')}>
          <Helmet title={fullName} />
          <Avatar
            alt="Username"
            src={this.props.profile.PhotoUrl}
            className={bemClasses('avatar')}
          />
          <div>
            {fullName}
          </div>
        </div>
      )
    }
    
    return null;
  }

  renderProfileForm = () => {
    const { profile, user } = this.props;

    if (profile && user && user.id === profile.id) {
      return (
        <React.Fragment>
          <UserInfoForm onSubmit={this.handleSubmitChanges} />
          <ConfirmationModal
            openDialog={this.state.openDialog}
            handleClose={this.handleClose}
            handleSubmit={this.change}
          />
        </React.Fragment>
      );
    }
    return null;
    
  }

   render = () => {
    return (
      <div className="content">
        {this.renderProfileInfo()}
        {this.renderProfileForm()}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

export default ProfilePage;