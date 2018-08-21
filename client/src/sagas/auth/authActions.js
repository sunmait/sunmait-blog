import { put, takeLatest, all } from 'redux-saga/effects';
import * as axios from 'axios';
import * as authApi from '../../api/auth';
import * as authHelper from '../../helpers/authHelper';
import { AUTH_CONSTANTS } from 'redux/modules/auth/constants';
import { SAGAS_AUTH_CONSTANTS } from './constants';

function* verifyCredentials() {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  if (accessToken && refreshToken) {
      try {
        const res = yield axios.patch('/api/auth/verify-credentials', {
          accessToken,
          refreshToken,
        });
        const { AccessToken, RefreshToken, Data } = res.data;
        authHelper.setAuthDataToLocalStorage(AccessToken, RefreshToken, JSON.stringify(Data));
        yield put({ type: AUTH_CONSTANTS.LOGIN, payload: res.data });
      } catch (err) {
        localStorage.clear();
      }
  }
  yield put({ type: AUTH_CONSTANTS.CREDENTIALS_CHECKED });
}

function* login(payload) {
  const Login = payload.payload.Login;
  const Password = payload.payload.Password;
  try {
    const res = yield authApi.login(Login, Password);
    const { AccessToken, RefreshToken } = res.data;
    const User = JSON.stringify(res.data.Data);

    authHelper.setAuthDataToLocalStorage(AccessToken, RefreshToken, User);

    yield put({ type: AUTH_CONSTANTS.LOGIN, payload: res.data });
  } catch (err) {
    console.error(err);
  }
}

function* logout(payload) {
  const refToken = payload.payload.refreshToken;
  yield axios.delete(`/api/auth/${refToken}`, {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`
    }
  });
  localStorage.clear();
  yield put({ type: AUTH_CONSTANTS.LOGOUT });
}

export function* authSagas() {
  yield all([
    takeLatest(SAGAS_AUTH_CONSTANTS.VERIFY_CREDENTIALS, verifyCredentials),
    takeLatest(SAGAS_AUTH_CONSTANTS.LOGIN, login),
    takeLatest(SAGAS_AUTH_CONSTANTS.LOGOUT, logout),
  ]);
}
