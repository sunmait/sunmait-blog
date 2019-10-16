import { put, takeLatest, all } from 'redux-saga/effects';
import * as axios from 'axios';
import { POST_CONSTANTS, POST_ACTIONS } from 'redux/modules/post/constants';
import { SAGAS_POST_CONSTANTS } from './constants';
import {
  getCommentsFromCurrentPost,
  addLikeOrDislikeSuccess,
  addRatingSuccess,
  getAveragePostSuccess,
  getUserPostRatingSuccess,
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
function* getAveragePost(action) {
  const { value: PostId } = action.payload;
  try {
    console.log('action playload', action.payload.value);
    console.log('its from front to back', PostId);
    const average = yield axios.post(
      `/api/posts/${PostId}/averagePost`,
      {
        PostId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    console.log('its recieved data', average.data);
    yield put(getAveragePostSuccess(average.data));
  } catch (error) {}
}
function* fetchRating({ payload }) {
  console.log('its data for create post', payload);
  try {
    const { value: Value, user } = payload;
    const { id: PostId } = payload.userInfo;
    console.log('watafak', payload.userInfo);
    const rating = yield axios.post(
      `/api/posts/${PostId}/rating`,
      {
        UserId: user,
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
function* getUserPostRating(data) {
  try {
    console.log('user rating', data.payload.data);
    const { user, post } = data.payload.data;
    console.log(user, post);
    const getUserPostRating = yield axios.post(
      `/api/posts/${post}/getUserPostRating`,
      {
        user: user,
        post: post,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    console.log('its recieved data from userpostRating', getUserPostRating.data);
    yield put(getUserPostRatingSuccess(getUserPostRating.data));
  } catch (error) {
    console.log(error);
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
    takeLatest(POST_ACTIONS.GET_AVERAGE_POST, getAveragePost),
    takeLatest(POST_ACTIONS.GET_USER_POST_RATING, getUserPostRating),
  ]);
}
