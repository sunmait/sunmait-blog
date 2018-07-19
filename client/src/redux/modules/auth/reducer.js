const defaultState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isCredentialsChecked: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED':
      return handleLogin(state, action.payload);

    case 'LOGIN':
      return handleLogin(state, action.payload);

    case 'LOGOUT':
      return handleLogout(state);

    case 'ACCESS_TOKEN_EXPIRED':
      return handleAccessTokenExpired(state, action.payload);

    case 'REFRESH_TOKEN_EXPIRED':
      return handleAccessTokenExpired(state, action.payload);

    case 'CREDENTIALS_CHECKED':
      return handleCredentialsChecked(state);

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
    refreshToken: tokens.RefreshToken
  };
}

function handleCredentialsChecked(state) {
  return {
    ...state,
    isCredentialsChecked: true,
  }
}