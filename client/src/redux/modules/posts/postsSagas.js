import * as axios from 'axios';
import { change, actionTypes } from 'redux-form';
import { call, put, takeLatest, all, select, delay } from 'redux-saga/effects';
import { parseTags } from './tagHelper';
import * as cloudinaryApi from 'api/cloudinaryApi.js';
import getYoutubeId from 'helpers/getYoutubeId.js';
import { POSTS_ACTIONS, INITIAL_NUMBER_OF_POSTS } from './postsConstants';
import history from 'components/containers/history';
import {
  getPostsSuccess,
  setPostsFetchingStatus,
  getMorePostsSuccess,
  getPosts,
  setMorePostsFetchingStatus,
} from 'redux/modules/posts/postsActions';
import { searchQuerySelector, searchTagsSelector } from 'redux/modules/posts/postsSelectors';

function* getPostsBaseSaga({ payload }) {
  try {
    const { count, offset } = payload;
    const searchSrc = yield select(searchQuerySelector) || '';
    const { str } = parseTags(searchSrc);
    const tags = yield select(searchTagsSelector) || null;
    let baseStr = `/api/posts?count=${count}&offset=${offset}`;
    if (tags) {
      baseStr += `&tag=${tags}`;
    }
    if (str) {
      baseStr += `&search=${str}`;
    }
    console.log(baseStr);
    
    let res = yield axios.get(baseStr);

    return res.data;
  } catch (err) {
    console.error('getPostsBaseSaga error', err);
    return [];
  }
}

function* getPostsSaga(action) {
  try {
    yield put(setPostsFetchingStatus(true));

    const posts = yield call(getPostsBaseSaga, action);

    yield put(getPostsSuccess(posts));
  } catch (err) {
    console.error('getPostsSaga error', err);
  }
}

function* getMorePostsSaga(action) {
  try {
    yield put(setMorePostsFetchingStatus(true));

    const posts = yield call(getPostsBaseSaga, action);

    yield put(getMorePostsSuccess(posts));
  } catch (err) {
    console.error('getMorePostsSaga error', err);
  }
}

function* addPost(payload) {
  const UserId = JSON.parse(localStorage.getItem('User')).id;
  yield axios.post(
    '/api/posts',
    {
      Title: payload.payload.title,
      Description: payload.payload.description,
      ImageUrl: payload.payload.imageUrl,
      Tags: payload.payload.Tags,
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
  const insertedMedia = `<iframe class="youtube-widget" width="560" height="315" src="https://www.youtube.com/embed/${getYoutubeId(
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
      Tags: payload.payload.Tags,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
      },
    }
  );

  console.log(payload.payload.Tags);
  

  yield put({ type: POSTS_ACTIONS.UPDATE_POST_SUCCESS, payload: res.data });
}

function* deletePost(payload) {
  const idPost = payload.payload.postId;

  yield axios.delete(`/api/posts/${idPost}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    },
  });
  yield put({ type: POSTS_ACTIONS.DELETE_POST_SUCCESS });

  history.push('/home');
}

export function* postsSagas() {
  yield all([
    takeLatest(POSTS_ACTIONS.GET_POSTS, getPostsSaga),
    takeLatest(POSTS_ACTIONS.GET_MORE_POSTS, getMorePostsSaga),

    takeLatest(POSTS_ACTIONS.ADD_POST, addPost),
    takeLatest(POSTS_ACTIONS.DELETE_POST, deletePost),
    takeLatest(POSTS_ACTIONS.LOAD_POST_IMAGE, loadPostImage),
    takeLatest(POSTS_ACTIONS.SET_TEXTAREA_SELECTION_VALUES, setTextareaSelectionValues),
    takeLatest(POSTS_ACTIONS.INSERT_DIVIDER, insertDivider),
    takeLatest(POSTS_ACTIONS.INSERT_IMAGE, insertImage),
    takeLatest(POSTS_ACTIONS.INSERT_VIDEO, insertVideo),
    takeLatest(POSTS_ACTIONS.UPDATE_POST, updatePost),
    takeLatest(POSTS_ACTIONS.CHANGE_SEARCH_TAGS, searchPostsSaga),
    // hook to load posts from server when search input changed
    takeLatest(({ type, meta }) => {
      const isSearchFormChanged = type === actionTypes.CHANGE && meta.form === 'posts';
      return isSearchFormChanged;
    }, searchPostsSaga),
  ]);
}

function* searchPostsSaga(action) {
  try {
    const count = INITIAL_NUMBER_OF_POSTS;
    const offset = 0;

    yield delay(700);
    yield call(getPostsSaga, getPosts(count, offset));
  } catch (err) {
    console.error('searchPostsSaga error', err);
  }
}
