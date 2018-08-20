import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { getBEMClasses } from 'helpers//BEMHelper';
import { Helmet } from 'react-helmet';
import UserInfoForm from './user-info-form/index.jsx';
import ConfirmationModal from './confirmation-modal/ConfirmationModal.jsx';
import '../../../assets/styles/ProfilePage.css';
import { Route } from 'react-router-dom';
import PostsList from 'components/common/postsList';
import NavMenu from 'components/common/navMenu';

const userProfile = 'user-profile';
const bemClasses = getBEMClasses([userProfile]);

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  componentDidMount() {
    this.reloadProfile(this.props);
    this.props.getCurrentUserPosts(this.props.match.params.userId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.reloadProfile(newProps);
    }
  }

  reloadProfile = props => {
    this.props.getUser(props.match.params.userId);
  };

  handleSubmitChanges = () => {
    this.setState({
      openDialog: true,
    });
  };

  change = () => {
    const { userFormValues, confirmFormValues, user } = this.props;
    const updatedUserData = {
      Login: user.Login,
      Password: confirmFormValues,
      changedUser: {
        id: user.id,
        name: userFormValues.FirstName,
        secondName: userFormValues.LastName,
        login: userFormValues.Login,
      },
    };

    this.props.updateUser(updatedUserData);
    this.props.history.push('/home');
  };

  logout = () => {
    const refToken = localStorage.getItem('RefreshToken');
    this.props.logout(refToken);
  };

  handleClose = event => {
    this.setState({
      openDialog: false,
    });
  };

  renderProfileInfo() {
    const { profile } = this.props;

    if (profile) {
      const fullName = `${profile.FirstName} ${profile.LastName}`;

      return (
        <div className={bemClasses('profile-info-block')}>
          <Helmet title={fullName} />
          <Avatar alt="Username" src={this.props.profile.PhotoUrl} className={bemClasses('avatar')} />
          <div>{fullName}</div>
        </div>
      );
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
    return <div>This is an info page</div>;
  };

  render = () => {
    const { match } = this.props;
    const navTabs = [
      {
        text: 'Info',
        url: `${match.url}`,
      },
      {
        text: 'Posts',
        url: `${match.url}/posts`,
      },
    ];

    return (
      <div className="content-wrapper">
        <div className="content">
          {this.renderProfileInfo()}
          <NavMenu tabs={navTabs} />
          <Route exact path={`${match.url}`} render={() => this.renderProfileForm()} />
          <Route
            path={`${match.url}/posts`}
            render={props => <PostsList {...props} posts={this.props.currentUserPosts} />}
          />
        </div>
      </div>
    );
  };
}

ProfilePage.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

export default ProfilePage;
