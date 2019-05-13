import * as axios from 'axios';
import { change } from 'redux-form';
import { put, takeLatest, all, select } from 'redux-saga/effects';

import * as cloudinaryApi from 'api/cloudinaryApi.js';
import getYoutubeId from 'helpers//getYoutubeId.js';
import { POSTS_ACTION_CONSTANTS } from './postsConstants';
import history from 'components/containers/history';
import { getPostsSuccess } from 'redux/modules/posts/postsActions';

function* getPosts({ payload }) {
  const { count, offset } = payload;

  yield put({ type: POSTS_ACTION_CONSTANTS.SET_POSTS_FETCHING_STATUS, payload: true });

  const res = yield axios.get(`/api/posts?count=${count}&offset=${offset}`);
  yield put(getPostsSuccess(res.data));

  yield put({ type: POSTS_ACTION_CONSTANTS.SET_POSTS_FETCHING_STATUS, payload: false });
}

function* addPost(payload) {
  const UserId = JSON.parse(localStorage.getItem('User')).id;
  yield axios.post(
    '/api/posts',
    {
      Title: payload.payload.title,
      Description: payload.payload.description,
      ImageUrl: payload.payload.imageUrl,
      UserId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
      },
    }
  );

  history.push('/home');
}

function* loadPostImage(payload) {
  const res = yield cloudinaryApi.postImage(payload.payload.file);

  yield put(change('post', 'ImageUrl', res.data));
}

function* setTextareaSelectionValues(payload) {
  yield put(change('post', 'textareaSelectionStart', payload.payload.start));
  yield put(change('post', 'textareaSelectionEnd', payload.payload.end));
}

function* insertDivider(payload) {
  const postFormValues = { ...(yield select(state => state.form.post.values)) };
  const { textareaSelectionStart, textareaSelectionEnd, Description } = postFormValues;
  const insertedMedia = `<hr />`;
  const newDecsription =
    Description.slice(0, textareaSelectionStart) + insertedMedia + Description.slice(textareaSelectionEnd + 1);

  yield put(change('post', 'Description', newDecsription));
}

function* insertImage(payload) {
  const postFormValues = { ...(yield select(state => state.form.post.values)) };
  const { textareaSelectionStart, textareaSelectionEnd, Description } = postFormValues;
  const insertedMedia = `<image src="${payload.payload.url}" />`;
  const newDecsription =
    Description.slice(0, textareaSelectionStart) + insertedMedia + Description.slice(textareaSelectionEnd + 1);

  yield put(change('post', 'insertImageUrl', ''));
  yield put(change('post', 'Description', newDecsription));
}

function* insertVideo(payload) {
  const postFormValues = { ...(yield select(state => state.form.post.values)) };
  const { textareaSelectionStart, textareaSelectionEnd, Description } = postFormValues;
  const insertedMedia = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYoutubeId(
    payload.payload.url
  )}" frameborder="0" allowfullscreen></iframe>`;
  const newDecsription =
    Description.slice(0, textareaSelectionStart) + insertedMedia + Description.slice(textareaSelectionEnd + 1);

  yield put(change('post', 'insertVideoUrl', ''));
  yield put(change('post', 'Description', newDecsription));
}

function* updatePost(payload) {
  const res = yield axios.patch(
    '/api/posts',
    {
      Title: payload.payload.title,
      Description: payload.payload.description,
      ImageUrl: payload.payload.imageUrl,
      idPost: payload.payload.idPost,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
      },
    }
  );

  yield put({ type: POSTS_ACTION_CONSTANTS.UPDATE_POST_SUCCESS, payload: res.data });
}

function* deletePost(payload) {
  const idPost = payload.payload.postId;

  yield axios.delete(`/api/posts/${idPost}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    },
  });
  yield put({ type: POSTS_ACTION_CONSTANTS.DELETE_POST_SUCCESS });

  history.push('/home');
}

export function* postsSagas() {
  yield all([
    takeLatest(POSTS_ACTION_CONSTANTS.GET_POSTS, getPosts),
    takeLatest(POSTS_ACTION_CONSTANTS.ADD_POST, addPost),
    takeLatest(POSTS_ACTION_CONSTANTS.DELETE_POST, deletePost),
    takeLatest(POSTS_ACTION_CONSTANTS.LOAD_POST_IMAGE, loadPostImage),
    takeLatest(POSTS_ACTION_CONSTANTS.SET_TEXTAREA_SELECTION_VALUES, setTextareaSelectionValues),
    takeLatest(POSTS_ACTION_CONSTANTS.INSERT_DIVIDER, insertDivider),
    takeLatest(POSTS_ACTION_CONSTANTS.INSERT_IMAGE, insertImage),
    takeLatest(POSTS_ACTION_CONSTANTS.INSERT_VIDEO, insertVideo),
    takeLatest(POSTS_ACTION_CONSTANTS.UPDATE_POST, updatePost),
  ]);
}
