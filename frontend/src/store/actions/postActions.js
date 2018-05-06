import { apiUrl, headers } from '../../utils/api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const SAVE_POST = 'SAVE_POST';

const getAllPosts = () =>
  fetch(`${apiUrl}/posts`, { headers })
    .then((res) => res.json())
    .then((data) => data);

const getPost = (postId) =>
  fetch(`${apiUrl}/posts/${postId}`, { headers })
    .then((res) => res.json())
    .then((data) => data);

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

export const fetchPosts = () => {
  const response = getAllPosts();
  return {
    type: FETCH_POSTS,
    payload: response
  };
};

export const fetchPost = (postId) => {
  const response = getPost();
  return {
    type: FETCH_POST,
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

export default {
  fetchPosts,
  fetchPost,
  createPost
};