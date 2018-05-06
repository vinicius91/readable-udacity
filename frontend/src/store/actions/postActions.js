import { apiUrl, headers } from '../../utils/api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SAVE_POST = 'SAVE_POST';
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const SAVE_COMMENT_EDIT = 'SAVE_COMMENT_EDIT';
export const SAVE_POST_EDIT = 'SAVE_POST_EDIT';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const SORT_POSTS_BY = 'SORT_POSTS_BY';

// POSTS

const getAllPosts = () =>
  fetch(`${apiUrl}/posts`, { headers })
    .then((res) => res.json())
    .then((data) => data);

const getPost = (postId) =>
  fetch(`${apiUrl}/posts/${postId}`, { headers })
    .then((res) => res.json())
    .then((data) => data);

const deletePost = (postId) =>
  fetch(`${apiUrl}/posts/${postId}`, { headers, method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data);

const getPostComments = (postId) =>
  fetch(`${apiUrl}/posts/${postId}/comments`, { headers })
    .then((res) => res.json())
    .then((data) => data);

const savePostEdit = (postId, body) =>
  fetch(`${apiUrl}/posts/${postId}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body,
    method: 'PUT'
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const savePost = (body) =>
  fetch(`${apiUrl}/posts`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body,
    method: 'POST'
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const saveVotePost = (id, body) =>
  fetch(`${apiUrl}/posts/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body,
    method: 'POST'
  })
    .then((res) => ({ result: res.ok, id, vote: body }))
    .catch((err) => console.log(err));

export const fetchPosts = () => {
  const response = getAllPosts();
  return {
    type: FETCH_POSTS,
    payload: response
  };
};

export const fetchPost = (postId) => {
  const response = getPost(postId);
  return {
    type: FETCH_POST,
    payload: response
  };
};

export const removePost = (postId) => {
  const response = deletePost(postId);
  return {
    type: DELETE_POST,
    payload: response
  };
};

export const createPost = (data, callback) => {
  const response = savePost(data).then(() => callback());
  return {
    type: SAVE_POST,
    payload: response
  };
};

export const editPost = (postId, data, callback) => {
  const response = savePostEdit(postId, data).then(() => callback());
  return {
    type: SAVE_POST_EDIT,
    payload: response
  };
};

export const votePost = (postId, vote) => {
  const response = saveVotePost(postId, vote);
  return {
    type: VOTE_POST,
    payload: response
  };
};

//COMMENTS

//API

const deleteComment = (commentId) =>
  fetch(`${apiUrl}/comments/${commentId}`, { headers, method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data);

const saveCommentEdit = (commentId, body) =>
  fetch(`${apiUrl}/comments/${commentId}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body,
    method: 'PUT'
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const saveComment = (body) =>
  fetch(`${apiUrl}/comments`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body,
    method: 'POST'
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const saveVoteComment = (id, body) =>
  fetch(`${apiUrl}/comments/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body,
    method: 'POST'
  })
    .then((res) => ({ result: res.ok, id, vote: body }))
    .catch((err) => console.log(err));

//ACTIONS

export const removeComment = (commentId) => {
  const response = deleteComment(commentId);
  return {
    type: DELETE_COMMENT,
    payload: response
  };
};

export const fetchPostComments = (postId) => {
  const response = getPostComments(postId);
  return {
    type: FETCH_POST_COMMENTS,
    payload: response
  };
};

export const createComment = (data) => {
  const response = saveComment(data);
  return {
    type: SAVE_COMMENT,
    payload: response
  };
};

export const editComment = (commentId, data) => {
  const response = saveCommentEdit(commentId, data);
  return {
    type: SAVE_COMMENT_EDIT,
    payload: response
  };
};

export const voteComment = (commentId, vote) => {
  const response = saveVoteComment(commentId, vote);
  return {
    type: VOTE_COMMENT,
    payload: response
  };
};

export const sortBy = (param) => {
  return {
    type: SORT_POSTS_BY,
    payload: param
  };
};

export default {
  fetchPosts,
  fetchPost,
  fetchPostComments,
  createPost,
  sortBy
};
