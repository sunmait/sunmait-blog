import { combineReducers} from 'redux';
<<<<<<< HEAD
import posts from './modules/posts/reducer';
import user from './modules/auth/reducer';

const rootReducer = combineReducers({
  posts,
  user
=======
// import auth from './modules/auth/reducer';
import posts from './modules/posts/reducer';

const rootReducer = combineReducers({
  posts,
>>>>>>> 82362fe... new structure
});

export default rootReducer;
