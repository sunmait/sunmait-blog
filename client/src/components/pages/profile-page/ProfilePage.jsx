import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { getBEMClasses } from 'helpers//BEMHelper';
import { Helmet } from 'react-helmet';
import UserInfoForm from './user-info-form/index.jsx';
import ConfirmationModal from './confirmation-modal/ConfirmationModal.jsx';
import { Route } from 'react-router-dom';
import PostsList from '../../containers/postsList';
import NavMenu from 'components/common/navMenu';
import Loader from 'components/common/loader';
import '../../../assets/styles/ProfilePage.css';

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
  }

  componentWillUnmount() {
    this.props.setCurrentUserPostsFetchingStatus(true);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.reloadProfile(newProps);
    }
  }

  reloadProfile = props => {
    props.getUser(props.match.params.userId);
    props.getCurrentUserPosts(props.match.params.userId);
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

  handleClose = event => {
    this.setState({
      openDialog: false,
    });
  };

  renderProfileHeader() {
    const { profile } = this.props;

    if (profile) {
      const fullName = `${profile.FirstName} ${profile.LastName}`;

      return (
        <div className={bemClasses('header')} data-cy="header">
          <Helmet title={fullName} />
          <Avatar
            alt="Username"
            src={this.props.profile.PhotoUrl}
            className={bemClasses('avatar')}
            data-cy="header__avatar"
          />
          <div data-cy="header__name-surname">{fullName}</div>
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
        url: match.url,
      },
      {
        text: 'Posts',
        url: `${match.url}/posts`,
      },
    ];

    return (
      <div className="content-wrapper content-wrapper--with-grey-background">
        <div className="content">
          {this.props.currentUserPostsFetchingStatus ? (
            <Loader />
          ) : (
            <React.Fragment>
              {this.renderProfileHeader()}
              <NavMenu tabs={navTabs} />
              <Route exact path={match.url} render={() => this.renderProfileForm()} />
              <Route
                path={`${match.url}/posts`}
                render={props => <PostsList {...props} posts={this.props.currentUserPosts} />}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  };
}

ProfilePage.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  setCurrentUserPostsFetchingStatus: PropTypes.func.isRequired,
};

export default ProfilePage;
