import { SAGAS_UNDO_REDO_POSTS_CONSTANTS } from '../../../sagas/undoRedoPost/constants';

export const undoPost = () => {
  return {
    type: SAGAS_UNDO_REDO_POSTS_CONSTANTS.UNDO_POST,
  }
};

export const redoPost = () => {
  return {
    type: SAGAS_UNDO_REDO_POSTS_CONSTANTS.REDO_POST,
  }
};
