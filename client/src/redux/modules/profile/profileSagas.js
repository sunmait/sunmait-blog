import { delay, call, put, takeLatest, all, select } from 'redux-saga/effects';
import * as axios from 'axios';
import { actionTypes } from 'redux-form';

import { PROFILE_ACTION_TYPES } from 'redux/modules/profile/profileConstants';
import { AUTH_CONSTANTS } from 'redux/modules/auth/constants';
import { getUserPosts } from 'api/postsApi';
import { INITIAL_NUMBER_OF_POSTS } from 'redux/modules/posts/postsConstants';
import { userPostsSearchSelector, getProfileUserIdSelector } from 'redux/modules/profile/profileSelectors';
import { getCurrentUserPosts } from 'redux/modules/profile/profileActions';

function* getUsersSaga() {
  const res = yield axios.get(`/api/users`);
  yield put({ type: PROFILE_ACTION_TYPES.GET_USERS_SUCCESS, payload: res.data });
}

function* getUserSaga(payload) {
  const res = yield axios.get(`/api/users/${payload.payload.userId}`);
  yield put({ type: PROFILE_ACTION_TYPES.GET_USER_SUCCESS, payload: res.data });
}

function* getCurrentUserPostsSaga({ userId }) {
  const search = yield select(userPostsSearchSelector);
  const res = yield getUserPosts(userId, {
    count: INITIAL_NUMBER_OF_POSTS,
    offset: 0,
    search,
  });
  yield put({ type: PROFILE_ACTION_TYPES.GET_CURRENT_USER_POSTS_SUCCESS, payload: res.data });
}

function* changeUserSaga({ updatedUserData }) {
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
    yield put({ type: PROFILE_ACTION_TYPES.UPDATE_USER_SUCCESS, payload: result.data });
    yield put({ type: AUTH_CONSTANTS.CHANGE, payload: result.data });

    let user = JSON.parse(localStorage.getItem('User'));
    user = { ...user, FirstName, LastName };

    localStorage.setItem('User', JSON.stringify(user));
  } catch (err) {
    console.error(err);
  }
}

function* searchUserPostsSaga() {
  try {
    const userId = yield select(getProfileUserIdSelector);

    yield delay(700);
    yield call(getCurrentUserPostsSaga, getCurrentUserPosts(userId));
  } catch (err) {
    console.error('searchPostsSaga error', err);
  }
}

export function* profileSagas() {
  yield all([
    takeLatest(PROFILE_ACTION_TYPES.UPDATE_USER, changeUserSaga),
    takeLatest(PROFILE_ACTION_TYPES.GET_USERS, getUsersSaga),
    takeLatest(PROFILE_ACTION_TYPES.GET_USER, getUserSaga),
    takeLatest(PROFILE_ACTION_TYPES.GET_CURRENT_USER_POSTS, getCurrentUserPostsSaga),

    // hook to load posts from server when search input changed
    takeLatest(({ type, meta }) => {
      const isSearchFormChanged = type === actionTypes.CHANGE && meta.form === 'userPosts';
      return isSearchFormChanged;
    }, searchUserPostsSaga),
  ]);
}
