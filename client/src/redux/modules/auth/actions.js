import AUTH_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import { IRegisteredUser, ILogin } from './reducer';
import history from 'components/containers/history';
import { logout as logOut } from '../../../components/helpers/authRequest';

const axiosRequest = axios;


export function login(Login, Password) {
  return (dispatch) => {
    return axiosRequest.post('/api/auth', { Login, Password })
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

export const verifyCredentials = () => (dispatch) => {
  console.log('step 1');
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const currentUser = JSON.parse(localStorage.getItem('User'));

  console.log('step 2');
  if (accessToken && refreshToken && currentUser) {
      const payload = axiosRequest.patch('/api/auth/verify-credentials', {
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
  }
};

export const logout = (refreshToken) => (dispatch) => {
  return axiosRequest
    .delete(`/api/auth/${refreshToken}`)
    .then(() => {
      logOut();
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logOut();
      } else if (err.response.status === 500) {
        history.push('/error/server-error"');
      } else {
        console.error(err);
        throw err;
      }
    });
};