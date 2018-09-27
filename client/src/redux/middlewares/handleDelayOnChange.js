import { take, select, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { UNDO_REDO_POST_CONSTANTS } from '../modules/undoRedoPost/constants';
import { SAGAS_POSTS_CONSTANTS } from '../../sagas/posts/constants';

import { actionTypes } from 'redux-form';

const postDescription = state => state.form.post.values.Description;
const pastDescription = state => state.undoRedoPost.past;
const limitLetters = 50000;

function* handleDelayOnChange() {
  while (true) {
    const { meta, type } = yield take();

    if (
      type === SAGAS_POSTS_CONSTANTS.INSERT_IMAGE ||
      type === SAGAS_POSTS_CONSTANTS.INSERT_VIDEO ||
      type === SAGAS_POSTS_CONSTANTS.INSERT_DIVIDER
    ) {
      yield call(delay, 1000);
      yield call(setUpdatedDescription);
    }

    if (
      type === actionTypes.CHANGE &&
      meta &&
      meta.form === 'post' &&
      meta.field === 'textareaSelectionStart'
    ) {
      const description = yield select(postDescription);
      const pastDescriptionValues = yield select(pastDescription);

      const currentDescription = pastDescriptionValues.slice(-1).pop();

      if (description !== currentDescription && description.length <= limitLetters) {
        yield call(delay, 1000);
        yield call(setUpdatedDescription);
      }
    }
  }
};

function* setUpdatedDescription() {
  const description = yield select(postDescription);
  const pastDescriptionValues = yield select(pastDescription);

  pastDescriptionValues.push(description);

  yield put({ type: UNDO_REDO_POST_CONSTANTS.SET_DELAY_POSTS, payload: pastDescriptionValues });
};

export default handleDelayOnChange; 
