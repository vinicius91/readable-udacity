import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers/index';

import api from '../utils/api';

// eslint-disable max-len
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api), logger))
);
