import { put, takeLatest, all } from 'redux-saga/effects';
import * as axios from 'axios';
import { POST_CONSTANTS } from 'redux/modules/post/constants';
import { SAGAS_POST_CONSTANTS } from './constants';

function* getPost({ postId }) {
  const res = yield axios.get(`/api/posts/${postId}`);
  yield put({ type: POST_CONSTANTS.GET_POST, payload: res.data });
}

export function* postSagas() {
  yield all([takeLatest(SAGAS_POST_CONSTANTS.GET_POST, getPost)]);
}
