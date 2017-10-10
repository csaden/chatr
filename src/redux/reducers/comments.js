import _ from 'lodash';
import {
  COMMENTS_FETCH_FAILED,
  COMMENTS_FETCH_SUCCESS,
  COMMENTS_REQUESTED
} from '../types';

export const initialState = {};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_FETCH_SUCCESS:
      const {comments, id} = action;
      return _.assign({}, state, {[id]: comments});
    case COMMENTS_FETCH_FAILED:
    default:
      return state;
  }
};

export function fetchCommentsForPost(id) {
  return {
    type: COMMENTS_REQUESTED,
    id
  };
};
