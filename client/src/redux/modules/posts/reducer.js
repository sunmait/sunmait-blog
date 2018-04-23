import POSTS_ACTIONS from './actionConstants';

const defaultState = [];

export default function( state = defaultState, action) {
  switch (action.type) {
    case POSTS_ACTIONS.GET_POSTS:
      return handlePosts(state, action.payload);
    case POSTS_ACTIONS.ADD_POST:
      return state;
    case POSTS_ACTIONS.UPDATE_POST:
      return handleUpdatedPosts(state, action.payload);
    case POSTS_ACTIONS.DELETE_POST:
      return handleDeletePost(state, action.payload);
    default:
      return state;
  }
}

function handleDeletePost(state, payload){
  return Object.assign({}, state, payload);
}

function handleUpdatedPosts(state, post) {
  return {...state, post};
}

function handlePosts(state, posts) {
  return Object.assign(
    {}, state, {
      posts
    }
  );
}
