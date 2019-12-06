import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts from './modules/posts/postsReducer';
import post from './modules/post/reducer';
import { profileReducer } from 'redux/modules/profile/profileReducer';
import user from './modules/auth/reducer';
import chat from './modules/chat/chatReducer';
import comments from './modules/comments/commentsReducer';

const rootReducer = combineReducers({
  posts,
  post,
  profile: profileReducer,
  user,
  chat,
  form: formReducer,
  comments,
});

export default rootReducer;
