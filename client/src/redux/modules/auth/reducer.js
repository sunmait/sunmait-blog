import AUTH_ACTIONS from './actionConstants';

const defaultState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

<<<<<<< HEAD
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
=======
export default function(state = defaultState, action) {
  switch (action.type) {
    case `${AUTH_ACTIONS.LOGIN}_FULFILLED`:
    console.log('received action', action.payload);
      return handleLogin(state, action.payload);
>>>>>>> cc8e932... Authentifications at first come to page

>>>>>>> 82362fe... new structure
    case AUTH_ACTIONS.LOGOUT:
      return handleLogout(state);

    case AUTH_ACTIONS.ACCESS_TOKEN_EXPIRED:
<<<<<<< HEAD
<<<<<<< HEAD
      return handleAccessTokenExpired(state, action.payload);

    case AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED:
      return handleLogin(state, action.payload);
=======
      return handleAccessTokenExpired(state, payload);

    case AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED:
      return handleLogin(state, payload);
>>>>>>> 82362fe... new structure
=======
      return handleAccessTokenExpired(state, action.payload);

    case AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED:
      return handleLogin(state, action.payload);
>>>>>>> cc8e932... Authentifications at first come to page

    default:
      return state;
  }
}

function handleLogin(state, loginData) {
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 82362fe... new structure
=======

  console.log('received action', loginData)
>>>>>>> cc8e932... Authentifications at first come to page
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
