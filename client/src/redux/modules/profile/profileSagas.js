import { delay, call, put, takeLatest, all, select } from 'redux-saga/effects';
import * as axios from 'axios';
import { actionTypes } from 'redux-form';

import { PROFILE_ACTION_TYPES } from 'redux/modules/profile/profileConstants';
import { AUTH_CONSTANTS } from 'redux/modules/auth/constants';
import { getUserPosts } from 'api/postsApi';
import { INITIAL_NUMBER_OF_POSTS } from 'redux/modules/posts/postsConstants';
import { userPostsSearchSelector, getProfileUserIdSelector } from 'redux/modules/profile/profileSelectors';
import { getCurrentUserPosts } from 'redux/modules/profile/profileActions';
import * as cloudinaryApi from 'api/cloudinaryApi.js';
import { ToastsStore } from 'react-toasts';

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

function* loadUserAvatarSaga(payload) {
  const user = payload.payload.userFormValues;
  const id = payload.payload.id;
  try {
    const res = yield cloudinaryApi.postImage(payload.payload.file);
    const { FirstName, LastName, BornDate } = user;
    // throw new Error();
    yield put({
      type: PROFILE_ACTION_TYPES.UPDATE_USER,
      updatedUserData: {
        id: id,
        changedUser: { firstName: FirstName, lastName: LastName, bornDate: BornDate, photoUrl: res.data },
      },
    });
  } catch (err) {
    ToastsStore.error('Server cannot upload your photo now');
  }
}

function* changeUserSaga(props) {
  const { updatedUserData } = props;

  let user = JSON.parse(localStorage.getItem('User'));

  const FirstName = updatedUserData.changedUser.name || user.FirstName;
  const LastName = updatedUserData.changedUser.secondName || user.LastName;
  const BornDate = updatedUserData.changedUser.bornDate || user.BornDate;
  const PhotoUrl = updatedUserData.changedUser.photoUrl || user.PhotoUrl;
  try {
    const result = yield axios.patch(
      `/api/users/`,
      { FirstName, LastName, BornDate, PhotoUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    yield put({ type: PROFILE_ACTION_TYPES.UPDATE_USER_SUCCESS, payload: result.data });
    yield put({ type: AUTH_CONSTANTS.CHANGE, payload: result.data });
    user = { ...user, FirstName, LastName, BornDate, PhotoUrl };

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

    takeLatest(PROFILE_ACTION_TYPES.LOAD_USER_AVATAR, loadUserAvatarSaga),
    // hook to load posts from server when search input changed
    takeLatest(({ type, meta }) => {
      const isSearchFormChanged = type === actionTypes.CHANGE && meta.form === 'userPosts';
      return isSearchFormChanged;
    }, searchUserPostsSaga),
  ]);
}
