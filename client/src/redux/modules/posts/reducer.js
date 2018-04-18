import POSTS_ACTIONS from './actionConstants';

const defaultState = [];

export default function(
  state = defaultState,
  { type, payload },
) {
  switch (type) {
    case POSTS_ACTIONS.GET_POSTS:
      return handlePosts(state, payload);
    default:
      return state;
  }
}

function handlePosts(state, posts) {
  return Object.assign(
    {}, state, {
      posts
    }
  );
}
