import { combineReducers } from "redux";

import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  ADD_COMMENT_TO_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT
} from "../actions";

function post(state = {}, action) {
  switch (action.type) {
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

function comment(state = {}, action) {
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

export default combineReducers({
  post,
  comment
});
