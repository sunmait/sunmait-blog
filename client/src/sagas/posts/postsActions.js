import * as cloudinaryApi from 'api/cloudinaryApi.js';
import { put, takeLatest, all, select } from 'redux-saga/effects';
import * as axios from 'axios';
import { change } from 'redux-form';
import getYoutubeId from 'helpers//getYoutubeId.js';
import { POSTS_CONSTANTS } from 'redux/modules/posts/constants';
import { POST_CONSTANTS } from 'redux/modules/post/constants';
import { SAGAS_POSTS_CONSTANTS } from './constants';
import history from 'components/containers/history';

function* findElementsIds(description, selectedItemId) {
  const childElementsIds = description.match(/\d+/g);
  const lastElementId = childElementsIds[childElementsIds.length - 1];
  const selectedItemIdNumber = selectedItemId.match(/\d+/g)[0];

  return { lastElementId, selectedItemIdNumber };
}

function* getPosts({ payload }) {
  const { count, offset } = payload;

  yield put({ type: POSTS_CONSTANTS.SET_POSTS_FETCHING_STATUS, payload: true });

  const res = yield axios.get(`/api/posts?count=${count}&offset=${offset}`);
  yield put({ type: POSTS_CONSTANTS.GET_POSTS, payload: res.data });

  yield put({ type: POSTS_CONSTANTS.SET_POSTS_FETCHING_STATUS, payload: false });
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

function* changePost(payload) {
  yield put(change('post', 'Description', payload.payload.description));
  yield put(change('post', 'selectedItemId', payload.payload.selectedItemId));
}

function* insertDivider() {
  const postFormValues = { ...(yield select(state => state.form.post.values)) };

  const { Description, selectedItemId } = postFormValues;
  const insertedMedia = `<hr>`;
  const emptyLine = '<div id="text-divider"><br></div>';

  const { lastElementId, selectedItemIdNumber } = yield findElementsIds(Description, selectedItemId);
  let dividerElement = `<div id="${selectedItemId}" contenteditable="false" tabindex="0">${insertedMedia}</div>`;

  if (lastElementId === selectedItemIdNumber) {
    dividerElement = dividerElement + emptyLine;
  }

  let newDecsription = insertedMedia;

  if (selectedItemId) {
    const matchingDiv = new RegExp(`<div id="${selectedItemId}"><br></div>`, 'gi');
    newDecsription = Description.replace(matchingDiv, dividerElement);
  }

  yield put(change('post', 'Description', newDecsription));
}

function* insertImage(payload) {
  const postFormValues = { ...(yield select(state => state.form.post.values)) };

  const { Description, selectedItemId } = postFormValues;
  const insertedMedia = `<img src="${payload.payload.url}">`;
  const emptyLine = '<div id="text-image"><br></div>';
  const { lastElementId, selectedItemIdNumber } = yield findElementsIds(Description, selectedItemId);
  let imageElement = `<div id="${selectedItemId}" contenteditable="false" tabindex="0">${insertedMedia}</div>`;

  if (lastElementId === selectedItemIdNumber) {
    imageElement = imageElement + emptyLine;
  }

  let newDecsription = insertedMedia;

  if (selectedItemId) {
    const matchingDiv = new RegExp(`<div id="${selectedItemId}"><br></div>`, 'gi');
    newDecsription = Description.replace(matchingDiv, imageElement);
  }

  yield put(change('post', 'insertImageUrl', ''));
  yield put(change('post', 'Description', newDecsription));
}

function* insertVideo(payload) {
  const postFormValues = { ...(yield select(state => state.form.post.values)) };

  const { Description, selectedItemId } = postFormValues;
  const insertedMedia = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYoutubeId(
    payload.payload.url
  )}" frameborder="0" allowfullscreen="true"></iframe>`;

  const emptyLine = '<div id="text-video"><br></div>';
  const { lastElementId, selectedItemIdNumber } = yield findElementsIds(Description, selectedItemId);
  let videoElement = `<div id="${selectedItemId}" contenteditable="false" tabindex="0">${insertedMedia}</div>`;

  if (lastElementId === selectedItemIdNumber) {
    videoElement = videoElement + emptyLine;
  }

  let newDecsription = insertedMedia;

  if (selectedItemId) {
    const matchingDiv = new RegExp(`<div id="${selectedItemId}"><br></div>`, 'gi');
    newDecsription = Description.replace(matchingDiv, videoElement);
  }

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

  yield put({ type: POST_CONSTANTS.UPDATE_POST, payload: res.data });
}

function* deletePost(payload) {
  const idPost = payload.payload.postId;
  yield axios.delete(`/api/posts/${idPost}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    },
  });

  yield put({ type: POST_CONSTANTS.DELETE_POST });

  history.push('/home');
}

export function* postsSagas() {
  yield all([
    takeLatest(SAGAS_POSTS_CONSTANTS.GET_POSTS, getPosts),
    takeLatest(SAGAS_POSTS_CONSTANTS.ADD_POST, addPost),
    takeLatest(SAGAS_POSTS_CONSTANTS.LOAD_POST_IMAGE, loadPostImage),
    takeLatest(SAGAS_POSTS_CONSTANTS.SET_TEXTAREA_SELECTION_VALUES, setTextareaSelectionValues),
    takeLatest(SAGAS_POSTS_CONSTANTS.INSERT_DIVIDER, insertDivider),
    takeLatest(SAGAS_POSTS_CONSTANTS.INSERT_IMAGE, insertImage),
    takeLatest(SAGAS_POSTS_CONSTANTS.INSERT_VIDEO, insertVideo),
    takeLatest(SAGAS_POSTS_CONSTANTS.UPDATE_POST, updatePost),
    takeLatest(SAGAS_POSTS_CONSTANTS.DELETE_POST, deletePost),
    takeLatest(SAGAS_POSTS_CONSTANTS.CHANGE_POST, changePost),
  ]);
}
