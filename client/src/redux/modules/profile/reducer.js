import USER_ACTIONS from './actionConstants';

const defaultState = {
  profile: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
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

function handleGetUser(state, selectedUser) {
  return {
    ...state,
    profile: selectedUser,
  };
}

function handleChange(state, updated) {
  return {
    ...state,
    profile: null
  };
}