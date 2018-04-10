import POSTS_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import history from 'components/containers/history';

const axiosRequest = axios;


export function getPosts() {
  return (dispatch) => {
    return axiosRequest
      .get('/api/posts')
      .then((res) => {
        console.log("Res: ");
        console.log(res);
        dispatch({
          type: POSTS_CONSTANTS.GET_POSTS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export const verifyCredentials = async (dispatch) => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const currentUser = JSON.parse(localStorage.getItem('User'));

  if (accessToken && refreshToken && currentUser) {
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
        accessToken,
        refreshToken,
      });
      const { AccessToken, RefreshToken } = res.data;
      const User = JSON.stringify(res.data.Data);

      localStorage.setItem('AccessToken', AccessToken);
      localStorage.setItem('RefreshToken', RefreshToken);
      localStorage.setItem('User', User);

      dispatch({
        type: AUTH_CONSTANTS.LOGIN,
        payload: res.data,
      });
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
  }
};

export const logout = (refreshToken) => (dispatch) => {
  return axiosRequest
    .delete(`/api/auth/${refreshToken}`)
    .then(() => {
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
      } else if (err.response.status === 500) {
        history.push('/error/server-error"');
      } else {
        console.error(err);
        throw err;
      }
    });
};