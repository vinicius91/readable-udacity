import { FETCH_CATEGORIES } from '../actions/categoriesActions';

const categoryInitialState = {
  categories: []
};

export default function CategoryState(state = categoryInitialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      const { categories } = action.payload;
      return {
        ...state,
        categories
      };
    }
    default:
      return state;
  }
}
