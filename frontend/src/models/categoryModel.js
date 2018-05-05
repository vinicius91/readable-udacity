import PropTypes from 'prop-types';

export const categoryPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
});

export const categoriesPropType = PropTypes.arrayOf(categoryPropType);
