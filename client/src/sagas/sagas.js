import { fork, all } from 'redux-saga/effects';
import { authSagas } from 'sagas/auth/authActions';
import { profileSagas } from 'redux/modules/profile/profileSagas';
import { postsSagas } from 'redux/modules/posts/postsSagas';
import { postSagas } from 'sagas/post/postActions';
import { chatSagas } from 'redux/modules/chat/chatSagas';
import { commentsSagas } from 'redux/modules/comments/commentsSagas';

function* rootSaga() {
  yield all([fork(authSagas), fork(profileSagas), fork(postsSagas), fork(chatSagas), fork(postSagas), fork(commentsSagas)]);
}

export default rootSaga;
