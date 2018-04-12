import AUTH_ACTIONS from './actionConstants';

const defaultState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case `${AUTH_ACTIONS.LOGIN}_FULFILLED`:
      return handleLogin(state, action.payload);

    case AUTH_ACTIONS.LOGIN:
      return handleLogin(state, action.payload);

    case AUTH_ACTIONS.LOGOUT:
      return handleLogout(state);

    case AUTH_ACTIONS.ACCESS_TOKEN_EXPIRED:
      return handleAccessTokenExpired(state, action.payload);

    case AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED:
      return handleAccessTokenExpired(state, payload);

    default:
      return state;
  }
}

function handleLogin(state, loginData) {
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
