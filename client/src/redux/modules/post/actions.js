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
export const addRatingSuccess = data => {
  return {
    type: SAGAS_POST_CONSTANTS.GET_RATING_SUCCESS,
    payload: data,
  };
};

export const fetchRating = (userInfo, value, user) => {
  return {
    type: POST_ACTIONS.GET_RATING,
    payload: { userInfo, value, user },
  };
};

export const getAveragePost = value => {
  return {
    type: POST_ACTIONS.GET_AVERAGE_POST,
    payload: { value },
  };
};
export const getUserPostRating = obj => {
  const data = {
    user: obj.user.id,
    post: obj.match.params.postId,
  };
  return {
    type: POST_ACTIONS.GET_USER_POST_RATING,
    payload: { data },
  };
};
export const getUserPostRatingSuccess = rating => {
  return {
    type: POST_ACTIONS.GET_USER_POST_RATING_SUCCESS,
    payload: { rating },
  };
};

export const getAveragePostSuccess = payload => {
  return {
    type: POST_ACTIONS.GET_AVERAGE_POST_SUCCESS,
    payload: { payload },
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
