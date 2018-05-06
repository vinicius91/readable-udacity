import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import PostState from './postReducer';
import CategoryState from './categoryReducer';

export default combineReducers({
  PostState,
  CategoryState,
  form: formReducer
});
