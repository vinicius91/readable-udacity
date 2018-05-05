// Post Actions Types
export const ADD_POST = 'ADD_POST';
export const SET_POSTS = 'SET_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

// Post Actions
export const getPosts = category => (dispatch, getState, api) => {
  api.getAllPosts().then((response) => {
    let posts = response;
    console.log(category);
    if (category) {
      if (category.name !== 'All') {
        posts = posts.filter(p => p.category === category.name);
      }
    }
    dispatch({
      type: SET_POSTS,
      payload: posts
    });
  });
};

export function addPost({ title, author, text }) {
  return {
    type: ADD_POST,
    title,
    author,
    text
  };
}

export function editPost({
  postId, title, author, text
}) {
  return {
    type: EDIT_POST,
    postId,
    title,
    author,
    text
  };
}

export function deletePost({ postId }) {
  return {
    type: DELETE_POST,
    postId
  };
}

export function upVotePost({ postId }) {
  return {
    type: UP_VOTE_POST,
    postId
  };
}

export function downVotePost({ postId }) {
  return {
    type: DOWN_VOTE_POST,
    postId
  };
}

// Comment Actions Types
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

// Comment Actions
export function addCommentToPost({ postId, author, text }) {
  return {
    type: ADD_COMMENT_TO_POST,
    postId,
    author,
    text
  };
}

export function editComment({ commentId, author, text }) {
  return {
    type: EDIT_COMMENT,
    commentId,
    author,
    text
  };
}

export function deleteComment({ commentId }) {
  return {
    type: DELETE_COMMENT,
    commentId
  };
}

export function upVoteComment({ commentId }) {
  return {
    type: UP_VOTE_COMMENT,
    commentId
  };
}

export function downVoteComment({ commentId }) {
  return {
    type: DOWN_VOTE_COMMENT,
    commentId
  };
}

// Comment Actions Types
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_FOR_CATEGORIES = 'GET_POSTS_FOR_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

// Comment Actions
export const getCategories = () => (dispatch, getState, api) => {
  api.getAllCategories().then((categories) => {
    dispatch({
      type: SET_CATEGORIES,
      payload: categories
    });
  });
};

export function getPostsForCategories({ categoryId }) {
  return {
    type: DELETE_COMMENT,
    categoryId
  };
}

export const setSelectedCategory = category => ({
  type: SET_SELECTED_CATEGORY,
  payload: category
});

export const setCategoryAndReloadBooks = category => (dispatch) => {
  dispatch(setSelectedCategory(category));
  dispatch(getPosts(category));
};
