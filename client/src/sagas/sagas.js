import { fork, all } from 'redux-saga/effects';
import {authSagas} from 'sagas/auth/authActions';
import {profileSagas} from 'sagas/profile/profileActions';
import {postsSagas} from 'sagas/posts/postsActions';

function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(profileSagas),
    fork(postsSagas)
  ]);
}

export default rootSaga;