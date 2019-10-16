import { POST_CONSTANTS, POST_ACTIONS } from './constants';
import { POSTS_ACTIONS } from 'redux/modules/posts/postsConstants';

const defaultState = {
  post: null,
  commentsOfCurrentPost: [],
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case POST_CONSTANTS.GET_POST:
      return handleGetPost(state, payload);

    case POSTS_ACTIONS.UPDATE_POST_SUCCESS:
      return handleUpdatePost(state, payload);

    case POSTS_ACTIONS.DELETE_POST_SUCCESS:
      return handleDeletePost(state);

    case POST_ACTIONS.GET_COMMENTS_FROM_CURRENT_POST:
      return handleGetCommentsFromCurrentPost(state, payload);

    case POST_ACTIONS.POST_LIKE_OR_DISLIKE_SUCCESS:
      return handleAddLikeOrDislikeSuccess(state, payload);
    case POST_ACTIONS.GET_RATING_SUCCESS:
      return handleGetRating(state, payload);
    case POST_ACTIONS.GET_AVERAGE_POST_SUCCESS:
      return handleGetAveragePostSuccess(state, payload);
    case POST_ACTIONS.GET_USER_POST_RATING_SUCCESS:
      return handleGetUserPostRatingSuccess(state, payload);
    default:
      return state;
  }
}

function handleGetUserPostRatingSuccess(state, payload) {
  return { ...state, post: { ...state.post, CurentRating: payload.rating } };
}
function handleAddLikeOrDislikeSuccess(state, payload) {
  let updatedLikes = [...state.post.Likes];
  const isDislike = updatedLikes.some(like => like.id === payload.id);
  if (isDislike) {
    updatedLikes = updatedLikes.filter(like => like.id !== payload.id);
  } else {
    updatedLikes.push(payload);
  }

  return { ...state, post: { ...state.post, Likes: updatedLikes } };
}

function handleGetRating(state, payload) {
  console.log(state.post);
  console.log(payload);
  return { ...state, post: { ...state.post, AverageRating: payload.Average } };
}

function handleGetCommentsFromCurrentPost(state, payload) {
  return { ...state, commentsOfCurrentPost: payload };
}
function handleGetAveragePostSuccess(state, payload) {
  return { ...state, post: { ...state.post, AverageRating: payload.payload } };
}

function handleGetPost(state, post) {
  return { ...state, post: post };
}

function handleUpdatePost(state, post) {
  return { ...state, post: post };
}

function handleDeletePost(state) {
  return { ...state, post: null };
}
