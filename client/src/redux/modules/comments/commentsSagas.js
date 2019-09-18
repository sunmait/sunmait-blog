import * as axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import { COMMENTS_ACTIONS } from './commentsConstants';
import { getCommentsSuccess, addCommentSuccess } from 'redux/modules/comments/commentsActions';

function* getCommentsSagas({ payload }) {
  try {
    const { PostId } = payload;
    const url = `/api/comments/${PostId}`;
    const comments = yield axios.get(url);
    yield put(getCommentsSuccess(comments.data));
  } catch (error) {
    console.log('getCommentsSagas error', error);
  }
}

function* addCommentSagas({ payload }) {
  try {
    const UserId = JSON.parse(localStorage.getItem('User')).id;
    const comment = yield axios.post(
      `/api/comments`,
      {
        Text: payload.text,
        UserId,
        PostId: payload.PostId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    yield put(addCommentSuccess(comment.data));
  } catch (error) {
    console.log('addCommentSagas error', error);
  }
}

export function* commentsSagas() {
  yield all([
    takeLatest(COMMENTS_ACTIONS.GET_COMMENTS, getCommentsSagas),
    takeLatest(COMMENTS_ACTIONS.ADD_COMMENT, addCommentSagas),
  ]);
}
