const apiUrl = 'http://localhost:3001';
/* eslint-disable */
// Generate a unique token for storing your bookshelf data on the backend server.
let { token } = localStorage;
if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: token
};

const getPost = postId =>
  fetch(`${apiUrl}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post);

const getAllPosts = () =>
  fetch(`${apiUrl}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

const getAllCategories = () =>
  fetch(`${apiUrl}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export default {
  getPost,
  getAllPosts,
  getAllCategories
};
