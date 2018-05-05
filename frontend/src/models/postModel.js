import PropTypes from 'prop-types';

export const postPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired
});

export const postsPropType = PropTypes.arrayOf(postPropType);
