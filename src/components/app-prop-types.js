import PropTypes from 'prop-types';

const post = {
  id:        PropTypes.string,
  timestamp: PropTypes.integer,
  title:     PropTypes.string,
  body:      PropTypes.string,
  author:    PropTypes.string,
  category:  PropTypes.string,
  voteScore: PropTypes.integer,
  deleted:   PropTypes.bool
}

const comment = {
  id:            PropTypes.string,
  parentId:      PropTypes.string,
  timestamp:     PropTypes.integer,
  body:          PropTypes.string,
  author:        PropTypes.string,
  voteScore:     PropTypes.integer,
  deleted:       PropTypes.bool,
  parentDeleted: PropTypes.bool
}

export {
  post,
  comment
};
