import { PROFILE_ACTION_TYPES } from 'redux/modules/profile/profileConstants';

export const getUser = userId => ({
  type: PROFILE_ACTION_TYPES.GET_USER,
  payload: { userId: userId },
});

export const getUsers = () => ({
  type: PROFILE_ACTION_TYPES.GET_USERS,
});
export const loadUserAvatar = avatar => ({
  type: PROFILE_ACTION_TYPES.LOAD_USER_AVATAR,
  payload: avatar,
});
export const updateUser = updatedUserData => ({
  type: PROFILE_ACTION_TYPES.UPDATE_USER,
  updatedUserData,
});

export const getCurrentUserPosts = userId => ({
  type: PROFILE_ACTION_TYPES.GET_CURRENT_USER_POSTS,
  userId,
});

export const setCurrentUserPostsFetchingStatus = isFetching => ({
  type: PROFILE_ACTION_TYPES.SET_CURRENT_USER_POSTS_FETCHING_STATUS,
  payload: isFetching,
});
