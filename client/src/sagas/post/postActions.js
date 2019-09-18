import { put, takeLatest, all } from 'redux-saga/effects';
import * as axios from 'axios';
import { POST_CONSTANTS } from 'redux/modules/post/constants';
import { SAGAS_POST_CONSTANTS } from './constants';
import { getCommentsFromCurrentPost } from '../../redux/modules/post/actions';

function* getPost({ postId }) {
  const res = yield axios.get(`/api/posts/${postId}`);
  yield put({ type: POST_CONSTANTS.GET_POST, payload: res.data });
}

function* getCommentsFromCurrentPostSagas({ payload }) {
  const { PostId } = payload;
  const url = `/api/posts/${PostId}`;
  const comments = yield axios.get(url);

  yield put(getCommentsFromCurrentPost(comments.data));
}

export function* postSagas() {
  yield all([
    takeLatest(SAGAS_POST_CONSTANTS.GET_POST, getPost),
    takeLatest(SAGAS_POST_CONSTANTS.GET_COMMENTS_FROM_CURRENT_POST, getCommentsFromCurrentPostSagas),
  ]);
}
