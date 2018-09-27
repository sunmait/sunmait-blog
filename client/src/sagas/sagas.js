import { fork, all } from 'redux-saga/effects';
import { authSagas } from 'sagas/auth/authActions';
import { profileSagas } from 'sagas/profile/profileActions';
import { postsSagas } from 'sagas/posts/postsActions';
import { undoRedoPostSagas } from 'sagas/undoRedoPost/undoRedoPostActions';
import handleDelayOnChange from '../redux/middlewares/handleDelayOnChange';

function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(profileSagas),
    fork(postsSagas),
    fork(undoRedoPostSagas),
    fork(handleDelayOnChange),
  ]);
}

export default rootSaga;
