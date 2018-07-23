import { put, takeLatest, all } from 'redux-saga/effects';
import * as axios from 'axios';
import { AUTH_CONSTANTS } from 'redux/modules/auth/constants';
import {SAGAS_AUTH_CONSTANTS} from './constants';

function* verifyCredentials() {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  if (accessToken && refreshToken) {
    const res = yield axios.patch(
      `/api/auth/verify-credentials`, {
        accessToken,
        refreshToken
      }
    );
    localStorage.setItem('AccessToken', res.data.AccessToken);
    localStorage.setItem('RefreshToken', res.data.RefreshToken);
    localStorage.setItem('User', JSON.stringify(res.data.Data));

    yield put({type: AUTH_CONSTANTS.LOGIN, payload: res.data});
  }
  yield put({type: AUTH_CONSTANTS.CREDENTIALS_CHECKED})
}

function* login(payload) {
  const Login = payload.payload.Login;
  const Password = payload.payload.Password;
  try {
    const res = yield axios.post(
      '/api/auth', {Login, Password}
    );
    const {AccessToken, RefreshToken} = res.data;
    const User = JSON.stringify(res.data.Data);

    localStorage.setItem('AccessToken', AccessToken);
    localStorage.setItem('RefreshToken', RefreshToken);
    localStorage.setItem('User', User);

    yield put({type: AUTH_CONSTANTS.LOGIN, payload: res.data});
  } catch ( err ) {
    console.error(err);
  }
}

function* logout(payload) {
  const refToken = payload.payload.refreshToken;
  yield axios.delete(
    `/api/auth/${refToken}`
  );
  localStorage.clear();
  yield put({type: AUTH_CONSTANTS.LOGOUT});
}

export function* authSagas() {
  yield all([
    takeLatest(SAGAS_AUTH_CONSTANTS.VERIFY_CREDENTIALS, verifyCredentials),
    takeLatest(SAGAS_AUTH_CONSTANTS.LOGIN, login),
    takeLatest(SAGAS_AUTH_CONSTANTS.LOGOUT, logout),
  ]);
}
