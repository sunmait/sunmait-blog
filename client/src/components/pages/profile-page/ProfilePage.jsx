import React, { useCallback, useEffect, useState } from 'react';
import '../../../assets/styles/ProfilePage.css';

import { getBEMClasses } from '../../../helpers/BEMHelper';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Avatar } from '@material-ui/core';
import UserInfoForm from './user-info-form/index.jsx';
import ConfirmationModal from '../../common/confirmation-modal/ConfirmationModal';
import Loader from '../../common/loader';
import NavMenu from '../../common/navMenu';
import { UserPostListContainer } from '../../containers/postsList';
const userProfile = 'userProfile';
const profilePageCn = getBEMClasses([userProfile]);

export const ProfilePage = ({
  getUser,
  updateUser,
  getCurrentUserPosts,
  setCurrentUserPostsFetchingStatus,
  setUserId,
  profile,
  user,
  userFormValues,
  currentUserPostsFetchingStatus,
  match,
}) => {
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
      },
    };
    updateUser(updatedUserData);
    handleClose();
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
          />
          <div data-cy={profilePageCn('header-name-surname')}>{fullName}</div>
        </div>
      );
    }
  };
  const renderProfileForm = (profile, user, handleClose, change, handleSubmitChanges, openDialog) => {
    if (profile && user && user.id === profile.id) {
      return (
        <>
          <UserInfoForm onSubmit={handleSubmitChanges} />
          <ConfirmationModal
            isOpen={openDialog}
            handleClose={handleClose}
            change
            handleSubmit={change}
            modalTitle="Confirm changes"
          />
        </>
      );
    }
    return <div>This is an info page</div>;
  };

  const navTabs = useCallback(
    match => [
      {
        text: 'Info',
        url: match.url,
      },
      {
        text: 'Posts',
        url: `${match.url}/posts`,
      },
    ],
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
          </>
        )}
      </div>
    </div>
  );
};
