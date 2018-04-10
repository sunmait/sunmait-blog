import POSTS_ACTIONS from './actionConstants';

const defaultState = [];
  // {},
  // post: {
  //   1: 
  //   {
  //     id: '', 
  //     UserId: '', 
  //     CreatedAt: "", 
  //     UpdatedAt: "", 
  //     Description: ""
  //   }
  // }
  // [{
    // id: '', 
    // UserId: '', 
    // CreatedAt: "", 
    // UpdatedAt: "", 
    // Description: ""
  // }]
  // ,

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
  // let posts = JSON.parse(payload);
  console.log(posts);
  return Object.assign(
    {}, state, {
      posts
    }
  );
  // return {...state, ...posts};
  // const newId = state.posts[state.posts.length - 1] + 1;
  // const newPost = Object.assign(
  //   {}, state.posts,
  //   {
  //     [newId]: {
  //       id: id, 
  //       UserId: '', 
  //       CreatedAt: "", 
  //       UpdatedAt: "", 
  //       Description: ""
  //     },
  //   }
  // );
  // return Object.assign(
  //   {}, state,
  //   {
  //     users: state.users.concat(newId),
  //     usersById: newUser,
  //   }
  // );
}

