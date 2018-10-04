import { SAGAS_POST_CONSTANTS } from 'sagas/post/constants';

export const getPost = postId => {
  return {
    type: SAGAS_POST_CONSTANTS.GET_POST,
    postId,
  };
};
