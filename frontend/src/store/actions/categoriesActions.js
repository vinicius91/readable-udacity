import { apiUrl, headers } from '../../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const getAllcategories = () =>
  fetch(`${apiUrl}/categories`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const fetchCategories = () => {
  const response = getAllcategories();
  return {
    type: FETCH_CATEGORIES,
    payload: response
  };
};

export default {
  fetchCategories
};
