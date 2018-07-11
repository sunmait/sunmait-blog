import * as cloudinaryApi from 'api/cloudinaryApi.js';
import { put, takeLatest, all, select } from 'redux-saga/effects';
import { change } from 'redux-form';
import * as axios from 'axios';
import { POSTS_CONSTANTS } from 'redux/modules/posts/constants';
import { SAGAS_POSTS_CONSTANTS } from './constants';

function* getPosts() {
  const res = yield axios.get(
    `/api/posts`
  );
  yield put({type: POSTS_CONSTANTS.GET_POSTS, payload: res.data})
}

function* addPost(payload) {
  const UserId = JSON.parse(localStorage.getItem('User')).id;
  const res = yield axios.post(
    '/api/posts', {
      Title: payload.payload.title,
      Description: payload.payload.description,
      ImageUrl: payload.payload.imageUrl,
      UserId
    }
  );
  yield put({type: POSTS_CONSTANTS.ADD_POST, payload: res.data});
}

function* loadPostImage(payload) {
  const res = yield cloudinaryApi.postImage(payload.payload.file)
  const imageUrl = res.data;

  yield put(change('post', 'ImageUrl', imageUrl));
}

function* updatePost(payload) {
  const res = yield axios.patch(
    '/api/posts', {
      Title: payload.payload.title,
      Description: payload.payload.description,
      ImageUrl: payload.payload.imageUrl,
      idPost: payload.payload.idPost
    }
  );

  const posts = [...yield select(state => state.posts.posts)];
  const post = res.data;

  posts.map((item, index) => {
    if (item.id === post.id) {
      posts[index] = post;

      return true;
    }
    return false;
  });

  yield put({type: POSTS_CONSTANTS.UPDATE_POST, payload: posts});
}

function* deletePost(payload) {
  const idPost = payload.payload.postId;
  const res = yield axios.delete(
    `/api/posts/${idPost}`, idPost
  );
  yield put({type: POSTS_CONSTANTS.DELETE_POST, payload: res.data});
}

export function* postsSagas() {
  yield all([
    takeLatest(SAGAS_POSTS_CONSTANTS.GET_POSTS, getPosts),
    takeLatest(SAGAS_POSTS_CONSTANTS.ADD_POST, addPost),
    takeLatest(SAGAS_POSTS_CONSTANTS.LOAD_POST_IMAGE, loadPostImage),
    takeLatest(SAGAS_POSTS_CONSTANTS.UPDATE_POST, updatePost),
    takeLatest(SAGAS_POSTS_CONSTANTS.DELETE_POST, deletePost)
  ]);
}
