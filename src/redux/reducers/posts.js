import _ from 'lodash';
import {
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILED,
  POSTS_SORT
} from '../types';

export const initialState = [];

export default function posts(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return action.posts;
    case POSTS_FETCH_FAILED:
      return state;
    case POSTS_SORT:
      return _.reverse(_.sortBy(state, action.sortKey));
    default:
      return state;
  }
};

export function sortPosts(sortKey) {
  return {
    type: POSTS_SORT,
    sortKey
  }
}