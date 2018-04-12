import * as axios from 'axios';
import store from 'redux/store';
import { ILogin } from 'redux/modules/auth/reducer';
import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';

const axiosRequest = axios;

function sendRequest(method, url, body) {
  const accessToken = localStorage.getItem('AccessToken');

  return new Promise((resolve, reject) => {
    if (accessToken) {
      const params = [];

      params.push(url);
      if (body || method === 'patch' || method === 'post') {
        params.push(body || {});
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
      // logout();
    }
  });
}

export default sendRequest;