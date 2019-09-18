import { COMMENTS_ACTIONS } from './commentsConstants';

const defaultState = {
  comments: [],
  commentsFetchingStatus: true,
  commentFetchingStatus: true,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case COMMENTS_ACTIONS.ADD_COMMENT_SUCCESS:
      return handleAddCommentSuccess(state, payload);

    case COMMENTS_ACTIONS.GET_COMMENTS_SUCCESS:
      return handleGetCommentsSuccess(state, payload);

    case COMMENTS_ACTIONS.GET_COMMENTS:
      return handleGetComments(state);

    case COMMENTS_ACTIONS.ADD_COMMENT:
      return handleAddComment(state);

    default:
      return state;
  }
}

function handleAddCommentSuccess(state, payload) {
  return { ...state, comments: [...state.comments, payload], commentFetchingStatus: false };
}

function handleGetCommentsSuccess(state, payload) {
  return { ...state, comments: payload, commentsFetchingStatus: false };
}

function handleGetComments(state) {
  return { ...state, commentsFetchingStatus: true };
}

function handleAddComment(state) {
  return { ...state, commentFetchingStatus: true };
}
