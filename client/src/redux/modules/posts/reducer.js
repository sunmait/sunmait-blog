const defaultState = [];

export default function( state = defaultState, action) {
  switch (action.type) {
    case 'GET_POSTS':
      return handlePosts(state, action.payload);
    case 'ADD_POST':
      return state;
    case 'UPDATE_POST':
      return handleUpdatedPosts(state, action.payload);
    case 'DELETE_POST':
      return handleDeletePost(state, action.payload);
    default:
      return state;
  }
}

function handleDeletePost(state, payload){
  return  { ...state, posts: payload };
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
