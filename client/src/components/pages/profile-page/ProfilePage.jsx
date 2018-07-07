import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { getBEMClasses } from 'components/helpers/BEMHelper';
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
    this.props.getUser(this.getUserId(this.props));
  }

  //TODO: maybe it remove
  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.reloadProfile(newProps);
    }
  }

  reloadProfile = (props) => {
    // TODO change to props.match.params.userId after removing ':' from url
    this.props.getUser(this.getUserId(props));
  }

  getUserId(props) {
    const userId = props.location.pathname.split(':')[1];
    this.setState({id: userId});
    return userId;
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
    return (
      <React.Fragment>
        {this.renderProfileInfo()}
        <UserInfoForm onSubmit={this.handleSubmitChanges} />
        <ConfirmationModal
          openDialog={this.state.openDialog}
          handleClose={this.handleClose}
          handleSubmit={this.change}
        />
      </React.Fragment>
    );
  }

  renderNotAuthorisedProfile = () => {
    return this.renderProfileInfo();
  }

  render = () => {
    const { profile, user } = this.props;

    if (profile && user) {
      if (user.id === profile.id) {
        return this.renderAuthorisedProfile();
      } else {
        return this.renderNotAuthorisedProfile();
      }
    }
    return null;
  }
}

ProfilePage.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

export default ProfilePage;