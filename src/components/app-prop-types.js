import PropTypes from 'prop-types';

const category = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string
});

const categories = PropTypes.arrayOf(category);

const post = PropTypes.shape({
  id:        PropTypes.string,
  timestamp: PropTypes.integer,
  title:     PropTypes.string,
  body:      PropTypes.string,
  author:    PropTypes.string,
  category:  PropTypes.string,
  voteScore: PropTypes.integer,
  deleted:   PropTypes.bool
});

const posts = PropTypes.arrayOf(post);

const comment = PropTypes.shape({
  id:            PropTypes.string,
  parentId:      PropTypes.string,
  timestamp:     PropTypes.integer,
  body:          PropTypes.string,
  author:        PropTypes.string,
  voteScore:     PropTypes.integer,
  deleted:       PropTypes.bool,
  parentDeleted: PropTypes.bool
});

export {
  category,
  categories,
  post,
  posts,
  comment
};
