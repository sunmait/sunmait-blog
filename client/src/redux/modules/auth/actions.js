import { SAGAS_AUTH_CONSTANTS } from 'sagas/auth/constants';

export const login = payload => {
  return {
    type: SAGAS_AUTH_CONSTANTS.LOGIN,
    payload
  }
};

export const logout = refreshToken => {
  return {
    type: SAGAS_AUTH_CONSTANTS.LOGOUT,
    payload: {refreshToken}
  }
};

export const verifyCredentials = () =>{
  return{
    type:SAGAS_AUTH_CONSTANTS.VERIFY_CREDENTIALS
  }
};
