import AUTH_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import { IRegisteredUser, ILogin } from './reducer';
import history from 'components/containers/history';
<<<<<<< HEAD
<<<<<<< HEAD
import { logout as logOut } from '../../../components/helpers/authRequest';
=======
>>>>>>> 82362fe... new structure
=======
import { logout as logOut } from '../../../components/helpers/authRequest';
>>>>>>> cc8e932... Authentifications at first come to page

const axiosRequest = axios;


<<<<<<< HEAD
<<<<<<< HEAD
export function login(Login, Password) {
  return (dispatch) => {
    return axiosRequest.post('/api/auth', { Login, Password })
=======
export function login(Email, Password) {
  return (dispatch) => {
    return axiosRequest
      .post('/api/auth', { Email, Password })
>>>>>>> 82362fe... new structure
=======
export function login(Login, Password) {
  return (dispatch) => {
    return axiosRequest.post('/api/auth', { Login, Password })
>>>>>>> cc8e932... Authentifications at first come to page
      .then((res) => {
        const { AccessToken, RefreshToken } = res.data;
        const User = JSON.stringify(res.data.Data);

        localStorage.setItem('AccessToken', AccessToken);
        localStorage.setItem('RefreshToken', RefreshToken);
        localStorage.setItem('User', User);
        console.log('before dispatch');
        console.log(res);

        dispatch({
          type: AUTH_CONSTANTS.LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

<<<<<<< HEAD
<<<<<<< HEAD
export const verifyCredentials = () => (dispatch) => {
=======
export const verifyCredentials = async (dispatch) => {
>>>>>>> 82362fe... new structure
=======
export const verifyCredentials = () => (dispatch) => {
  console.log('step 1');
>>>>>>> cc8e932... Authentifications at first come to page
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const currentUser = JSON.parse(localStorage.getItem('User'));

  console.log('step 2');
  if (accessToken && refreshToken && currentUser) {
<<<<<<< HEAD
<<<<<<< HEAD
      const payload = axiosRequest.patch('/api/auth/verify-credentials', {
        accessToken,
        refreshToken,
      }).then((res)=>{  
        localStorage.setItem('AccessToken', res.data.AccessToken);
        localStorage.setItem('RefreshToken', res.data.RefreshToken);
        localStorage.setItem('User', JSON.stringify(res.data.Data));
        return res.data;
      })

      dispatch({
        type: AUTH_CONSTANTS.LOGIN,
        payload,
      });
=======
    dispatch({
      type: AUTH_CONSTANTS.LOGIN,
      payload: {
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        Data: currentUser,
      },
    });
    try {
      const res = await axiosRequest.patch('/api/auth/verify-credentials', {
=======
      const payload = axiosRequest.patch('/api/auth/verify-credentials', {
>>>>>>> cc8e932... Authentifications at first come to page
        accessToken,
        refreshToken,
      }).then((res)=>{  
        console.log('res', res);
        localStorage.setItem('AccessToken', res.data.AccessToken);
        localStorage.setItem('RefreshToken', res.data.RefreshToken);
        localStorage.setItem('User', JSON.stringify(res.data.Data));
        return res.data;
      })

      dispatch({
        type: AUTH_CONSTANTS.LOGIN,
        payload,
      });
<<<<<<< HEAD
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear();
        dispatch({
          type: AUTH_CONSTANTS.LOGOUT,
        });
      } else {
        console.error(err);
        throw err;
      }
    }
>>>>>>> 82362fe... new structure
=======
>>>>>>> cc8e932... Authentifications at first come to page
  }
};

export const logout = (refreshToken) => (dispatch) => {
  return axiosRequest
    .delete(`/api/auth/${refreshToken}`)
    .then(() => {
<<<<<<< HEAD
<<<<<<< HEAD
      logOut();
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logOut();
=======
      // TODO: import logout function from helper
      localStorage.clear();

      dispatch({
        type: AUTH_CONSTANTS.LOGOUT,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        localStorage.clear();

        dispatch({
          type: AUTH_CONSTANTS.LOGOUT,
        });
>>>>>>> 82362fe... new structure
=======
      logOut();
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logOut();
>>>>>>> cc8e932... Authentifications at first come to page
      } else if (err.response.status === 500) {
        history.push('/error/server-error"');
      } else {
        console.error(err);
        throw err;
      }
    });
};