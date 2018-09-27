import { UNDO_REDO_POST_CONSTANTS } from './constants';

const defaultState = {
  past: [],
  future: [],
};

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case UNDO_REDO_POST_CONSTANTS.SET_DELAY_POSTS:
      return handleSetDescriptionWithDelay(state, payload);

    case UNDO_REDO_POST_CONSTANTS.UNDO_POST:
      return handleUndoPostAction(state, payload);

    case UNDO_REDO_POST_CONSTANTS.REDO_POST:
      return handleRedoPostAction(state, payload);

    default:
      return state;
  }
}

function handleSetDescriptionWithDelay(state, past) {
  return { ...state, past };
}

function handleUndoPostAction(state, payload) {
  return {
    ...state,
    past: payload.past,
    future: payload.future,
  };
}

function handleRedoPostAction(state, payload) { 
  return {
    ...state,
    past: payload.past,
    future: payload.future,
  };
}
