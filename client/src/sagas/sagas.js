import { fork, all } from 'redux-saga/effects';
import { authSagas } from 'sagas/auth/authActions';
import { profileSagas } from 'redux/modules/profile/profileSagas';
import { postsSagas } from 'redux/modules/posts/postsSagas';
import { postSagas } from 'sagas/post/postActions';

function* rootSaga() {
  yield all([fork(authSagas), fork(profileSagas), fork(postsSagas), fork(postSagas)]);
}

export default rootSaga;
