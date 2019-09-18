import { SAGAS_POST_CONSTANTS } from 'sagas/post/constants';

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
