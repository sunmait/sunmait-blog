import * as axios from 'axios';
import store from 'redux/store';
import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';

const axiosRequest = axios;

function sendRequest(method, url, body) {
  const accessToken = localStorage.getItem('AccessToken');

  return new Promise((resolve, reject) => {
    if (accessToken) {
      const params = [];

      params.push(url);
      if (body) {
        params.push(body);
      }
      params.push({
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      axiosRequest[method](...params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (err.response.status === 401 && err.response.statusText === 'jwt expired') {
            refreshTokens(method, url, body)
              .then((res) => resolve(res))
              .catch((error) => reject(error));
          } else {
            reject(err);
          }
        });
    } else {
      logout();
    }
  });
}

function refreshTokens(method, url, body) {
  const refreshToken = localStorage.getItem('RefreshToken');

  return new Promise((resolve, reject) => {
    axiosRequest
      .patch(`/api/auth/refresh/${refreshToken}`)
      .then((res) => {
        const { AccessToken, RefreshToken } = res.data;
        const User = JSON.stringify(res.data.Data);

        localStorage.setItem('AccessToken', AccessToken);
        localStorage.setItem('RefreshToken', RefreshToken);
        localStorage.setItem('User', User);

        store.dispatch({
          type: AUTH_ACTIONS.LOGIN,
          payload: res.data,
        });

        sendRequest(method, url, body)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
      })
      .catch((err) => {
        if (err.response.status === 401 && err.response.statusText === 'jwt expired') {
          logout();
        } else {
          reject(err);
        }
      });
  });
}

export function logout() {
  localStorage.clear();

  store.dispatch({
    type: AUTH_ACTIONS.LOGOUT,
  });
}

export default sendRequest;