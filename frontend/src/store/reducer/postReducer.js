import {
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST,
  FETCH_POST_COMMENTS,
  VOTE_POST,
  VOTE_COMMENT,
  SORT_POSTS_BY,
  DELETE_COMMENT
} from '../actions/postActions';

import _ from 'lodash';

const postInitialState = {
  posts: [],
  selectedPost: {
    post: null,
    comments: []
  },
  lastOrder: {
    timestamp: 'asc',
    voteScore: 'asc'
  }
};

const orderPosts = (posts, param, lastOrder) => {
  const order = lastOrder[param] === 'asc' ? 'desc' : 'asc';
  return { posts: _.orderBy(posts, [param], [order]), order };
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
    case DELETE_POST: {
      const post = action.payload;
      const posts = _.remove(state.posts, (p) => p.id !== post.id);
      return {
        ...state,
        posts
      };
    }

    case DELETE_COMMENT: {
      const comment = action.payload;
      const comments = state.selectedPost.comments.filter(
        (c) => c.id !== comment.id
      );
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          comments
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
    case SORT_POSTS_BY: {
      const param = action.payload;
      const { posts, order } = orderPosts(state.posts, param, state.lastOrder);
      const lastOrder =
        param === 'timestamp'
          ? { ...state.lastOrder, timestamp: order }
          : { ...state.lastOrder, voteScore: order };
      console.log('Before', state.lastOrder);
      console.log('After', lastOrder);
      return {
        ...state,
        lastOrder,
        posts
      };
    }
    case VOTE_POST: {
      const { result, id, vote } = action.payload;
      if (result) {
        const value = JSON.parse(vote).option === 'upVote' ? 1 : -1;
        const posts = state.posts.map((post) => {
          if (post.id === id) {
            const voteScore = post.voteScore + value;
            return {
              ...post,
              voteScore
            };
          }
          return post;
        });
        return {
          ...state,
          posts
        };
      }
      return state;
    }
    case VOTE_COMMENT: {
      const { result, id, vote } = action.payload;
      if (result) {
        const value = JSON.parse(vote).option === 'upVote' ? 1 : -1;
        const comments = state.selectedPost.comments.map((comment) => {
          if (comment.id === id) {
            const voteScore = comment.voteScore + value;
            return {
              ...comment,
              voteScore
            };
          }
          return comment;
        });
        return {
          ...state,
          selectedPost: {
            ...state.selectedPost,
            comments
          }
        };
      }
      return state;
    }
    default:
      return state;
  }
}
