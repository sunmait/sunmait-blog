import React from 'react';
import '../../../assets/styles/ProfilePage.css';
import Avatar from 'material-ui/Avatar';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import store from '../../../redux/store';
import UserInfoForm from './user-info-form/index.jsx';
import ConfirmationModal from './confirmation-modal/ConfirmationModal.jsx';
const action = ({ type, payload }) => store.dispatch({type, payload});

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
    // TODO change to props.match.params.userId after removing ':' from url
    const userId = +props.location.pathname.split(':')[1];
    action({type : 'GET_USER_SAGA', payload: {userId}});
  }

  handleSubmitChanges = () => {
    this.setState({
      openDialog: true
    });
  }

  change = () => {
    const { userFormValues, confirmFormValues, user } = this.props;

    action({type : 'CHANGE_USER_SAGA',
      payload: {
        Login: user.Login,
        Password: confirmFormValues,
        changedUser: {
          id: user.id,
          name: userFormValues.FirstName,
          secondName: userFormValues.LastName,
          login: userFormValues.Login
        }
      }
    });
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

export default ProfilePage;