import { USER_CONSTANTS } from './constants';

const defaultState = {
  profile: null,
  usersById: {},
};

export default function (state = defaultState, {type, payload}) {
  switch (type) {
    case USER_CONSTANTS.GET_USERS:
      return handleGetUsers(state, payload);

    case USER_CONSTANTS.GET_USER:
      return handleGetUser(state, payload);

    case USER_CONSTANTS.CHANGE:
      return handleChange(state, payload);

    // case USER_CONSTANTS.CHANGE_PASSWORD::
    //   return handleAccessTokenExpired(state, payload);

    default:
      return state;
  }
}

function handleGetUsers(state, selectedUsers) {
  let newUsersByIdNames = {};
  selectedUsers.forEach(item => {
    newUsersByIdNames = {...newUsersByIdNames, [item.id]: item.FirstName};
  });

  return {...state, usersById: newUsersByIdNames};
}

function handleGetUser(state, selectedUser) {
  return {...state, profile: selectedUser};
}

function handleChange(state, updated) {
  const updatedUserById = { ...state.usersById, [updated.id]: updated.FirstName};
  return Object.assign(
    {}, state,
    {
      usersById: updatedUserById,
      profile: null,
    }
  );
}