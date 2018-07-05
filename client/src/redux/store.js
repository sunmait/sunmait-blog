import { applyMiddleware, createStore, Dispatch } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'redux/rootReducer.js';
import createSagaMiddleware from 'redux-saga';
import mainSaga from '../sagas/sagas'


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
export default store;

sagaMiddleware.run(mainSaga);