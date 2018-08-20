import { put, takeLatest, all } from 'redux-saga/effects';
import * as axios from 'axios';
import { USER_CONSTANTS } from 'redux/modules/profile/constants';
import { AUTH_CONSTANTS } from 'redux/modules/auth/constants';
import { SAGAS_PROFILE_CONSTANTS } from './constants';

function* getUsers1() {
  const res = yield axios.get(`/api/users`);
  yield put({ type: USER_CONSTANTS.GET_USERS, payload: res.data });
}

function* getUser(payload) {
  const res = yield axios.get(`/api/users/${payload.payload.userId}`);
  yield put({ type: USER_CONSTANTS.GET_USER, payload: res.data });
}

function* getCurrentUserPosts({ userId }) {
  const res = yield axios.get(`/api/users/${userId}/posts`);
  yield put({ type: USER_CONSTANTS.GET_CURRENT_USER_POSTS, payload: res.data });
}

function* changeUser(payload) {
  //TODO: why this need login and logout requests? check this method!!

  const Login = payload.payload.Login;
  const Password = payload.payload.Password;
  try {
    const res = yield axios.post('/api/auth', { Login, Password });
    yield put({ type: AUTH_CONSTANTS.LOGIN, payload: res.data });
    const FirstName = payload.payload.changedUser.name;
    const userId = payload.payload.changedUser.id;
    const LastName = payload.payload.changedUser.secondName;
    const NewLogin = payload.payload.changedUser.login;
    try {
      const result = yield axios.patch(`/api/users/${userId}`, { FirstName, LastName, Login: NewLogin });
      yield put({ type: USER_CONSTANTS.CHANGE, payload: result.data });
      localStorage.clear();
      const result1 = yield axios.post('/api/auth', { Login: NewLogin, Password });
      const { AccessToken, RefreshToken } = result1.data;
      const User = JSON.stringify(result1.data.Data);

      localStorage.setItem('AccessToken', AccessToken);
      localStorage.setItem('RefreshToken', RefreshToken);
      localStorage.setItem('User', User);
      yield put({ type: AUTH_CONSTANTS.LOGIN, payload: result1.data });
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
}

export function* profileSagas() {
  yield all([
    takeLatest(SAGAS_PROFILE_CONSTANTS.CHANGE_USER, changeUser),
    takeLatest(SAGAS_PROFILE_CONSTANTS.GET_USERS, getUsers1),
    takeLatest(SAGAS_PROFILE_CONSTANTS.GET_USER, getUser),
    takeLatest(SAGAS_PROFILE_CONSTANTS.GET_CURRENT_USER_POSTS, getCurrentUserPosts),
  ]);
}
