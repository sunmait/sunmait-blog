import { SAGAS_PROFILE_CONSTANTS } from 'sagas/profile/constants';

export const getUser = userId => {
  return {
    type: SAGAS_PROFILE_CONSTANTS.GET_USER,
    payload: { userId: userId },
  };
};

export const getUsers = () => {
  return {
    type: SAGAS_PROFILE_CONSTANTS.GET_USERS,
  };
};

export const updateUser = payload => {
  return {
    type: SAGAS_PROFILE_CONSTANTS.CHANGE_USER,
    payload: payload,
  };
};

export const getCurrentUserPosts = userId => {
  return {
    type: SAGAS_PROFILE_CONSTANTS.GET_CURRENT_USER_POSTS,
    userId,
  };
};
