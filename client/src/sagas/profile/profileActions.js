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

function* getCurrentUserPostsSaga({ userId }) {
  const res = yield axios.get(`/api/users/${userId}/posts`);
  yield put({ type: USER_CONSTANTS.GET_CURRENT_USER_POSTS, payload: res.data });
}

function* changeUser({ updatedUserData }) {
  const userId = updatedUserData.id;
  const FirstName = updatedUserData.changedUser.name;
  const LastName = updatedUserData.changedUser.secondName;

  try {
    const result = yield axios.patch(
      `/api/users/${userId}`,
      { FirstName, LastName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    yield put({ type: USER_CONSTANTS.CHANGE, payload: result.data });
    yield put({ type: AUTH_CONSTANTS.CHANGE, payload: result.data });

    let user = JSON.parse(localStorage.getItem('User'));
    user = { ...user, FirstName, LastName };

    localStorage.setItem('User', JSON.stringify(user));
  } catch (err) {
    console.error(err);
  }
}

export function* profileSagas() {
  yield all([
    takeLatest(SAGAS_PROFILE_CONSTANTS.CHANGE_USER, changeUser),
    takeLatest(SAGAS_PROFILE_CONSTANTS.GET_USERS, getUsers1),
    takeLatest(SAGAS_PROFILE_CONSTANTS.GET_USER, getUser),
    takeLatest(SAGAS_PROFILE_CONSTANTS.GET_CURRENT_USER_POSTS, getCurrentUserPostsSaga),
  ]);
}
