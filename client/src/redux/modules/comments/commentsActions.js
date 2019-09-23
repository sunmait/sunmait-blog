import { COMMENTS_ACTIONS } from './commentsConstants';

export const addComment = (PostId, text) => ({
  type: COMMENTS_ACTIONS.ADD_COMMENT,
  payload: {
    PostId,
    text,
  },
});

export const addCommentSuccess = comment => {
  return {
    type: COMMENTS_ACTIONS.ADD_COMMENT_SUCCESS,
    payload: comment,
  };
};

const getCommentsActionCreator = type => PostId => ({
  type,
  payload: {
    PostId,
  },
});

export const getComments = getCommentsActionCreator(COMMENTS_ACTIONS.GET_COMMENTS);

export const getCommentsSuccess = comments => {
  return {
    type: COMMENTS_ACTIONS.GET_COMMENTS_SUCCESS,
    payload: comments,
  };
};
