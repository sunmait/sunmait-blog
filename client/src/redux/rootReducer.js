import { combineReducers} from 'redux';
import posts from './modules/posts/reducer';
import user from './modules/auth/reducer';
import profile from './modules/profile/reducer';

const rootReducer = combineReducers({
  posts,
  user,
  profile
});

export default rootReducer;
