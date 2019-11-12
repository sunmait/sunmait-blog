import { AUTH_CONSTANTS } from './constants';

const defaultState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isCredentialsChecked: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case AUTH_CONSTANTS.LOGIN:
      return handleLogin(state, action.payload);

    case AUTH_CONSTANTS.LOGOUT:
      return handleLogout(state);

    case AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRED:
      return handleAccessTokenExpired(state, action.payload);

    case AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRED:
      return handleAccessTokenExpired(state, action.payload);

    case AUTH_CONSTANTS.CREDENTIALS_CHECKED:
      return handleCredentialsChecked(state);

    case AUTH_CONSTANTS.CHANGE:
      return handleChange(state, action.payload);

    case AUTH_CONSTANTS.PASSWORD_CHANGED:
      return handlePasswordChange(state, action.payload);

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

function handleCredentialsChecked(state) {
  return {
    ...state,
    isCredentialsChecked: true,
  };
}

function handleChange(state, updated) {
  const { FirstName, LastName, BornDate, PhotoUrl } = updated;
  const updatedUser = { ...state.user, FirstName, LastName, BornDate, PhotoUrl };
  return {
    ...state,
    user: updatedUser,
  };
}

function handlePasswordChange(state, res){
  return {
    ...state
  }
}
