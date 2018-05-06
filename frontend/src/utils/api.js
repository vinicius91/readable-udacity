export const apiUrl = 'http://localhost:3001';
/* eslint-disable */
// Generate a unique token for storing your bookshelf data on the backend server.
let { token } = localStorage;
if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

export const headers = {
  Accept: 'application/json',
  Authorization: token
};
