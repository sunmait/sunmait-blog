const defaultState = {
  profile: null,
  usersById: {},
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'GET_USERS':
      return handleGetUsers(state, action.payload);

    case 'GET_USER':
      return handleGetUser(state, action.payload);

    case 'CHANGE':
      return handleChange(state, action.payload);

    // case 'CHANGE_PASSWORD':
    //   return handleAccessTokenExpired(state, payload);

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
  const updatedUserById = { ...state.usersById, [updated.id]: updated.FirstName};
  return Object.assign(
    {}, state,
    {
      usersById: updatedUserById,
      profile: null,
    }
  );
}