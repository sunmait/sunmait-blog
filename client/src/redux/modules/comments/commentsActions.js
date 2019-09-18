import { COMMENTS_ACTIONS } from './commentsConstants';

const addCommentActionCreaator = type => (PostId, text) => ({
  type,
  payload: {
    PostId,
    text,
  },
});

export const addComment = addCommentActionCreaator(COMMENTS_ACTIONS.ADD_COMMENT);

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
