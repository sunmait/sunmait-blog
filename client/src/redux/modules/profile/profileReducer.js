import { PROFILE_ACTION_TYPES } from './profileConstants';

const defaultState = {
  profile: null,
  usersById: {},
  postsOfCurrentUser: [],
  currentUserPostsFetchingStatus: true,
};

export function profileReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case PROFILE_ACTION_TYPES.GET_USERS_SUCCESS:
      return handleGetUsers(state, payload);

    case PROFILE_ACTION_TYPES.GET_USER_SUCCESS:
      return handleGetUser(state, payload);

    case PROFILE_ACTION_TYPES.UPDATE_USER_SUCCESS:
      return handleChange(state, payload);

    case PROFILE_ACTION_TYPES.GET_CURRENT_USER_POSTS_SUCCESS:
      return handleGetCurrentUserPosts(state, payload);

    case PROFILE_ACTION_TYPES.SET_CURRENT_USER_POSTS_FETCHING_STATUS:
      return setCurrentUserPostsFetchingStatus(state, payload);

    default:
      return state;
  }
}

function handleGetUsers(state, selectedUsers) {
  let newUsersByIdNames = {};
  selectedUsers.forEach(item => {
    newUsersByIdNames = { ...newUsersByIdNames, [item.id]: item.FirstName };
  });

  return { ...state, usersById: newUsersByIdNames };
}

function handleGetUser(state, selectedUser) {
  return { ...state, profile: selectedUser };
}

function handleChange(state, updated) {
  const { FirstName, LastName } = updated;
  const updatedUserById = { ...state.usersById, [updated.id]: FirstName };
  const updatedProfile = { ...state.profile, FirstName, LastName };

  return {
    ...state,
    usersById: updatedUserById,
    profile: updatedProfile,
  };
}

function handleGetCurrentUserPosts(state, postsOfCurrentUser) {
  return { ...state, postsOfCurrentUser, currentUserPostsFetchingStatus: false };
}

function setCurrentUserPostsFetchingStatus(state, isFetching) {
  return { ...state, currentUserPostsFetchingStatus: isFetching };
}
