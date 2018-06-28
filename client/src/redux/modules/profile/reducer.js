import USER_ACTIONS from './actionConstants';

const defaultState = {
  profile: null,
  usersById: {},
  updatedUser: {}
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case USER_ACTIONS.GET_USERS:
      return handleGetUsers(state, action.payload);

    case USER_ACTIONS.GET_USER:
      return handleGetUser(state, action.payload);

    case USER_ACTIONS.CHANGE:
      return handleChange(state, action.payload);

    case USER_ACTIONS.CHANGE_PASSWORD:
      return handleAccessTokenExpired(state, payload);

    default:
      return state;
  }
}

function handleGetUsers(state, selectedUsers) {
  let newUsersByIdNames = {};
  selectedUsers.forEach(function(item, i) {
    newUsersByIdNames = Object.assign(
      {}, newUsersByIdNames,
      {
        [item.id]: item.FirstName
      }
    );
  });
  return Object.assign(
    {}, state,
    {
      usersById: newUsersByIdNames
    }
  );
}

function handleGetUser(state, selectedUser) {
  return Object.assign(
    {}, state,
    {
      profile: selectedUser
    }
  );
}

function handleChange(state, updated) {
  const updatedUserById = Object.assign(
    {}, state.usersById,
    {
      [updated.id]: updated.FirstName
    }
  );
  const updatedUser = Object.assign(
    {}, state.updatedUser,
    {
      FirstName: updated.FirstName,
      LastName: updated.LastName,
      Login: updated.Login
    }
  );
  return Object.assign(
    {}, state,
    {
      usersById: updatedUserById,
      profile: null,
      updatedUser
    }
  );
}