import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts from './modules/posts/postsReducer';
import post from './modules/post/reducer';
import user from './modules/auth/reducer';
import profile from './modules/profile/reducer';

const rootReducer = combineReducers({
  posts,
  post,
  user,
  profile,
  form: formReducer,
});

export default rootReducer;
