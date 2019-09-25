import { SAGAS_POST_CONSTANTS } from 'sagas/post/constants';
import { POST_ACTIONS } from './constants';

export const addLikeOrDislike = (postId, userId, user) => {
  return {
    type: POST_ACTIONS.POST_LIKE_OR_DISLIKE,
    payload: {
      postId,
      userId,
      user,
    },
  };
};

export const addLikeOrDislikeSuccess = like => {
  return {
    type: SAGAS_POST_CONSTANTS.POST_LIKE_OR_DISLIKE_SUCCESS,
    payload: like,
  };
};

export const getPost = postId => {
  return {
    type: SAGAS_POST_CONSTANTS.GET_POST,
    postId,
  };
};

export const getCommentsFromCurrentPost = comments => {
  return {
    type: SAGAS_POST_CONSTANTS.GET_COMMENTS_FROM_CURRENT_POST,
    payload: comments,
  };
};
