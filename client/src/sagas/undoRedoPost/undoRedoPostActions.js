import { put, takeLatest, all, select } from 'redux-saga/effects';
import { change } from 'redux-form';
import { UNDO_REDO_POST_CONSTANTS } from '../../redux/modules/undoRedoPost/constants';
import { SAGAS_UNDO_REDO_POSTS_CONSTANTS } from './constants';

function* undoPost() {
  let newFutureDescription;
  const { past: pastDescription, future: futureDescription } = yield select(state => state.undoRedoPost);

  const previousDescription = pastDescription[pastDescription.length - 2];
  const presentDescription = pastDescription[pastDescription.length - 1];
  const newPastDescription = pastDescription.slice(0, pastDescription.length - 1);

  if (pastDescription.length === 0) {
    return;
  }

  if (presentDescription === futureDescription[0]) {
    newFutureDescription = [...futureDescription];
  } else {
    newFutureDescription = [presentDescription, ...futureDescription];
  }

  yield all([
    put(change('post', 'Description', previousDescription || '')),
    put({
      type: UNDO_REDO_POST_CONSTANTS.UNDO_POST,
      payload: {
        past: newPastDescription,
        future: newFutureDescription,
      },
    })
  ]);
}

function* redoPost() {
  const { past: pastDescription, future: futureDescription } = yield select(state => state.undoRedoPost);

  if (futureDescription.length === 0) {
    return;
  }

  const newPastDescription = futureDescription[0];
  const newfutureDescription = futureDescription.slice(1);

  yield all([
    put(change('post', 'Description', newPastDescription)),
    put({
      type: UNDO_REDO_POST_CONSTANTS.REDO_POST,
      payload: {
        past: [...pastDescription, newPastDescription],
        future: newfutureDescription,
      },
    })
  ]);
}

export function* undoRedoPostSagas() {
  yield all([
    takeLatest(SAGAS_UNDO_REDO_POSTS_CONSTANTS.UNDO_POST, undoPost),
    takeLatest(SAGAS_UNDO_REDO_POSTS_CONSTANTS.REDO_POST, redoPost),
  ]);
}
