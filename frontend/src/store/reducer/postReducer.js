import { FETCH_POSTS } from '../actions/postActions';

const postInitialState = {
  posts: []
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
    default:
      return state;
  }
}
