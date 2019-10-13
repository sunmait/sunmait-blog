import { put, takeLatest, all } from 'redux-saga/effects';
import * as axios from 'axios';
import { POST_CONSTANTS, POST_ACTIONS } from 'redux/modules/post/constants';
import { SAGAS_POST_CONSTANTS } from './constants';
import {
  getCommentsFromCurrentPost,
  addLikeOrDislikeSuccess,
  addRatingSuccess,
} from '../../redux/modules/post/actions';

function* getPost({ postId }) {
  const res = yield axios.get(`/api/posts/${postId}`);
  yield put({ type: POST_CONSTANTS.GET_POST, payload: res.data });
}

function* addLikeOrDislike({ payload }) {
  try {
    const PostId = payload.postId;
    const like = yield axios.post(
      `/api/posts/${PostId}/likes`,
      {
        UserId: payload.userId,
        UserInfo: payload.user,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    yield put(addLikeOrDislikeSuccess(like.data));
  } catch (error) {
    console.log('addLikeOrDislike error', error);
  }
}
function* fetchRating({ payload }) {
  try {
    const { value: Value } = payload;
    const { id: PostId, UserId } = payload.userInfo;
    console.log('watafak', payload.userInfo);
    const rating = yield axios.post(
      `/api/posts/${PostId}/rating`,
      {
        UserId: UserId,
        PostId: PostId,
        Value: Value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    console.log('its recieved data', rating.data);
    yield put(addRatingSuccess(rating.data));
  } catch (error) {
    console.log('fetch rating  error', error);
  }
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
    takeLatest(POST_ACTIONS.POST_LIKE_OR_DISLIKE, addLikeOrDislike),
    takeLatest(POST_ACTIONS.GET_RATING, fetchRating),
  ]);
}
