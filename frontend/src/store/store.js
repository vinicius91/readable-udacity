import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import logger from 'redux-logger';

import reducer from './reducer/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, promise))
);
