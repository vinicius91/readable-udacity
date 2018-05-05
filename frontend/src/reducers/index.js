import { combineReducers } from 'redux';

import {
  SET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  ADD_COMMENT_TO_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  SET_CATEGORIES,
  SET_SELECTED_CATEGORY
} from '../actions';

const postInitialState = {
  posts: [],
  selectedPost: null
};

function postState(state = postInitialState, action) {
  switch (action.type) {
    case SET_POSTS: {
      const posts = action.payload;
      return {
        ...state,
        posts
      };
    }
    case ADD_POST:
      return state;
    case EDIT_POST:
      return state;
    case DELETE_POST:
      return state;
    case UP_VOTE_POST:
      return state;
    case DOWN_VOTE_POST:
      return state;
    default:
      return state;
  }
}

function commentState(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT_TO_POST:
      return state;
    case EDIT_COMMENT:
      return state;
    case DELETE_COMMENT:
      return state;
    case UP_VOTE_COMMENT:
      return state;
    case DOWN_VOTE_COMMENT:
      return state;
    default:
      return state;
  }
}

const categoryInitialState = {
  categories: [],
  selectedCategory: { name: 'All', path: '' }
};

function categoryState(state = categoryInitialState, action) {
  switch (action.type) {
    case SET_CATEGORIES: {
      const categories = action.payload;
      return {
        ...state,
        categories
      };
    }
    case SET_SELECTED_CATEGORY: {
      const selectedCategory = action.payload;
      if (state.selectedCategory.path === selectedCategory.path) {
        return state;
      }
      return {
        ...state,
        selectedCategory
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  postState,
  commentState,
  categoryState
});
