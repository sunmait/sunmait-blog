import AUTH_ACTIONS from './actionConstants';

const defaultState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

<<<<<<< HEAD
export default function(state = defaultState, action) {
  switch (action.type) {
    case `${AUTH_ACTIONS.LOGIN}_FULFILLED`:
      return handleLogin(state, action.payload);

    case AUTH_ACTIONS.LOGIN:
      return handleLogin(state, action.payload);
=======
export default function(
  state = defaultState,
  { type, payload },
) {
  switch (type) {
    case AUTH_ACTIONS.LOGIN:
      return handleLogin(state, payload);

>>>>>>> 82362fe... new structure
    case AUTH_ACTIONS.LOGOUT:
      return handleLogout(state);

    case AUTH_ACTIONS.ACCESS_TOKEN_EXPIRED:
<<<<<<< HEAD
      return handleAccessTokenExpired(state, action.payload);

    case AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED:
      return handleLogin(state, action.payload);
=======
      return handleAccessTokenExpired(state, payload);

    case AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED:
      return handleLogin(state, payload);
>>>>>>> 82362fe... new structure

    default:
      return state;
  }
}

function handleLogin(state, loginData) {
<<<<<<< HEAD

=======
>>>>>>> 82362fe... new structure
  return {
    ...state,
    user: loginData.Data,
    accessToken: loginData.AccessToken,
    refreshToken: loginData.RefreshToken,
  };
}

function handleLogout(state) {
  return {
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
  };
}

function handleAccessTokenExpired(state, tokens) {
  return {
    ...state,
    accessToken: tokens.AccessToken,
    refreshToken: tokens.RefreshToken,
  };
}
