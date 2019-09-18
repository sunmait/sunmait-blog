import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts from './modules/posts/postsReducer';
import post from './modules/post/reducer';
import { profileReducer } from 'redux/modules/profile/profileReducer';
import user from './modules/auth/reducer';
import comments from './modules/comments/commentsReducer';

const rootReducer = combineReducers({
  posts,
  post,
  profile: profileReducer,
  user,
  form: formReducer,
  comments,
});

export default rootReducer;
