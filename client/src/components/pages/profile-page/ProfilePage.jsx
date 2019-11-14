import React, { useCallback, useEffect, useState, useRef } from 'react';
import '../../../assets/styles/ProfilePage.css';

import { getBEMClasses } from '../../../helpers/BEMHelper';
import { Route } from 'react-router-dom';
import PrivateRoute from '../../containers/custom-routes/PrivateRoute.jsx';
import { Helmet } from 'react-helmet';
import { Avatar } from '@material-ui/core';
import UserInfoForm from './user-info-form/index.jsx';
import ConfirmationModal from '../../common/confirmation-modal/ConfirmationModal';
import Loader from '../../common/loader';
import NavMenu from '../../common/navMenu';
import { UserPostListContainer } from '../../containers/postsList';
import { Settings } from './settings/Settings';

const userProfile = 'user-profile';
const profilePageCn = getBEMClasses([userProfile]);

export const ProfilePage = ({
  getUser,
  updateUser,
  loadUserAvatar,
  getCurrentUserPosts,
  setCurrentUserPostsFetchingStatus,
  setUserId,
  profile,
  user,
  userFormValues,
  currentUserPostsFetchingStatus,
  match,
  auth,
}) => {
  const fileInputRef = useRef(null);

  const reloadProfile = userId => {
    getUser(userId);
    getCurrentUserPosts(userId);
  };
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(
    () => {
      setUserId(match.params.userId);
      reloadProfile(match.params.userId);
      return () => setCurrentUserPostsFetchingStatus(true);
    },
    [match.params.userId]
  );
  const handleSubmitChanges = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const change = () => {
    const updatedUserData = {
      id: user.id,
      changedUser: {
        name: userFormValues.FirstName,
        secondName: userFormValues.LastName,
        bornDate: userFormValues.BornDate,
      },
    };
    updateUser(updatedUserData);
    handleClose();
  };

  const isUserPage = user && profile && user.FirstName === profile.FirstName;

  const handleClick = () => {
    if (isUserPage) {
      fileInputRef.current.click();
    }
  };
  const pointerType = isUserPage ? 'pointer' : 'auto';

  const handleLoad = e => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    loadUserAvatar({ file, userFormValues, id: user.id });
  };
  const renderProfileHeader = () => {
    if (profile) {
      const fullName = `${profile.FirstName} ${profile.LastName}`;
      return (
        <div className={profilePageCn('header')} data-cy="headers">
          <Helmet />
          <Avatar
            alt="UserAvatar"
            src={profile.PhotoUrl}
            className={profilePageCn('avatar')}
            data-cy="header__avatar"
            onClick={() => handleClick()}
            style={{ cursor: pointerType }}
          />
          <input
            type="file"
            id="avatarFileinput"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={fileAvatar => {
              handleLoad(fileAvatar);
            }}
          />
          <div data-cy={profilePageCn('header-name-surname')}>{fullName}</div>
        </div>
      );
    }
  };
  const renderProfileForm = (profile, user, handleClose, change, handleSubmitChanges, openDialog) => {
    let isUserProfile = false;
    if (profile && user && user.id === profile.id) {
      isUserProfile = true;
    }
    return (
      <>
        <UserInfoForm isUserProfile={isUserProfile} onSubmit={handleSubmitChanges} />
        <ConfirmationModal
          isOpen={openDialog}
          handleClose={handleClose}
          change
          handleSubmit={change}
          modalTitle="Confirm changes"
        />
      </>
    );

    // return <div>This is an info page</div>;
  };

  const navTabs = useCallback(
    match => {
      const tabs = [
        {
          text: 'Info',
          url: match.url,
        },
        {
          text: 'Posts',
          url: `${match.url}/posts`,
        },
        {
          text: 'Settings',
          url: `${match.url}/settings`,
        },
      ];
      auth.user && +match.params.userId !== auth.user.id && tabs.pop();
      return tabs;
    },
    [match]
  );

  return (
    <div className="content-wrapper content-wrapper--with-grey-background">
      <div className="content">
        {currentUserPostsFetchingStatus ? (
          <Loader />
        ) : (
          <>
            {renderProfileHeader()}
            <NavMenu tabs={navTabs(match)} />
            <Route
              exact
              path={match.url}
              render={() => renderProfileForm(profile, user, handleClose, change, handleSubmitChanges, openDialog)}
            />
            <Route path={`${match.url}/posts`} render={UserPostListContainer} />
            {auth.user &&
              +match.params.userId === auth.user.id && (
                <PrivateRoute path={`${match.url}/settings`} auth={auth} component={props => <Settings {...props} />} />
              )}
          </>
        )}
      </div>
    </div>
  );
};
