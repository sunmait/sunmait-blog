import { call, put, takeEvery, takeLatest, take, all, select } from 'redux-saga/effects';
import * as axios from 'axios';

function* getUsers() {
  const res = yield axios.get(
    `/api/users`
  );
  yield put({ type: 'GET_USERS', payload: res.data})
}

function* getUser(payload) {
  const res = yield axios.get(
    `/api/users/${payload.payload.userId}`
  );
  yield put({ type: 'GET_USER', payload: res.data})
}

function* getPosts() {
  const res = yield axios.get(
    `/api/posts`
  );
  yield put({ type: 'GET_POSTS', payload: res.data})
}

function* verifyCredentials() {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  if (accessToken && refreshToken) {
    const res = yield axios.patch(
      `/api/auth/verify-credentials`, {
        accessToken,
        refreshToken
      }
    );
    localStorage.setItem('AccessToken', res.data.AccessToken);
    localStorage.setItem('RefreshToken', res.data.RefreshToken);
    localStorage.setItem('User', JSON.stringify(res.data.Data));

    yield put({ type: 'LOGIN', payload: res.data});
  }
}

function* login(payload) {
  const Login = payload.payload.Login;
  const Password = payload.payload.Password;
  try {
    const res = yield axios.post(
      '/api/auth', { Login, Password }
    );
    const { AccessToken, RefreshToken } = res.data;
    const User = JSON.stringify(res.data.Data);

    localStorage.setItem('AccessToken', AccessToken);
    localStorage.setItem('RefreshToken', RefreshToken);
    localStorage.setItem('User', User);
    yield put({ type: 'LOGIN', payload: res.data});
  } catch(err) {
    console.error(err);
  }
}

function* logout(payload) {
  const refToken = payload.payload.refreshToken
  const res = yield axios.delete(
    `/api/auth/${refToken}`
  );
  localStorage.clear();
  yield put({ type: 'LOGOUT'});
}

function* changeUser(payload) {
  const Login = payload.payload.Login;
  const Password = payload.payload.Password;
  try {
    const res = yield axios.post(
      '/api/auth', { Login, Password }
    );
    yield put({ type: 'LOGIN', payload: res.data});
    const FirstName = payload.payload.changedUser.name;
    const userId = payload.payload.changedUser.id;
    const LastName = payload.payload.changedUser.secondName;
    const NewLogin = payload.payload.changedUser.login;
    try {
      const result = yield axios.patch(
        `/api/users/${userId}`, { FirstName, LastName, Login: NewLogin }
      );
      yield put({ type: 'CHANGE', payload: result.data});
      localStorage.clear();
      yield put({ type: 'LOGOUT'});
      const result1 = yield axios.post(
        '/api/auth', { Login: NewLogin, Password }
      );
      const { AccessToken, RefreshToken } = result1.data;
      const User = JSON.stringify(result1.data.Data);

      localStorage.setItem('AccessToken', AccessToken);
      localStorage.setItem('RefreshToken', RefreshToken);
      localStorage.setItem('User', User);
      yield put({ type: 'LOGIN', payload: result1.data});
    } catch(err) {
      console.error(err);
    }
  } catch(err) {
    console.error(err);
  }
}

function* addPost(payload) {
  const UserId = JSON.parse(localStorage.getItem('User')).id;
  const res = yield axios.post(
    '/api/posts', { Title: payload.payload.title, Description: payload.payload.description, UserId }
  );
  yield put({ type: 'ADD_POST', payload: res.data});
}

function* updatePost(payload) {
  const res = yield axios.patch(
    '/api/posts', {
      Title: payload.payload.title,
      Description: payload.payload.description,
      idPost: payload.payload.idPost
    }
  );

  const posts = [...yield select(state => state.posts.posts)];
  const post = res.data;

  posts.find((item, index) => {
    if (item.id === post.id) {
      posts[index] = post;

      return true;
    }
    return false;
  });

  yield put({type: 'UPDATE_POST', payload: posts});
}

function* deletePost(payload) {
  const idPost = payload.payload.postId;
  const res = yield axios.delete(
    `/api/posts/${idPost}`, idPost
  );
  yield put({ type: 'DELETE_POST', payload: res.data});
  alert("Post deleted!");
}

function* mainSaga() {
  yield all([
    yield takeLatest("VERIFY_CREDENTIALS_SAGA", verifyCredentials),
    yield takeLatest("LOGIN_SAGA", login),
    yield takeLatest("LOGOUT_SAGA", logout),
    yield takeLatest("CHANGE_USER_SAGA", changeUser),
    yield takeLatest("GET_POSTS_SAGA", getPosts),
    yield takeLatest("GET_USERS_SAGA", getUsers),
    yield takeLatest("GET_USER_SAGA", getUser),
    yield takeLatest("ADD_POST_SAGA", addPost),
    yield takeLatest("UPDATE_POST_SAGA", updatePost),
    yield takeLatest("DELETE_POST_SAGA", deletePost)
  ]);
}

export default mainSaga;