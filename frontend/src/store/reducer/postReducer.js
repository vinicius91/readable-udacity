import {
  FETCH_POSTS,
  FETCH_POST,
  FETCH_POST_COMMENTS
} from '../actions/postActions';

const postInitialState = {
  posts: [],
  selectedPost: {
    post: null,
    comments: []
  }
};

export default function PostState(state = postInitialState, action) {
  switch (action.type) {
    case FETCH_POSTS: {
      const posts = action.payload;
      return {
        ...state,
        posts
      };
    }
    case FETCH_POST: {
      const post = action.payload;
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          post
        }
      };
    }
    case FETCH_POST_COMMENTS: {
      const comments = action.payload;
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          comments
        }
      };
    }
    default:
      return state;
  }
}
