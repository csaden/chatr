import _ from 'lodash';
import {
  POSTS_ADD_FAILED,
  POSTS_ADD_SUCCESS,
  POSTS_ADD_REQUESTED,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILED,
  POSTS_SORT
} from '../types';

export const initialState = [];

export default function posts(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return action.posts;
    case POSTS_ADD_SUCCESS:
      return _.concat(state, action.post);
    case POSTS_ADD_FAILED:
    case POSTS_FETCH_FAILED:
      return state;
    case POSTS_SORT:
      return _.orderBy(state, [action.sortKey], ['desc']);
    default:
      return state;
  }
};

export function sortPosts(sortKey) {
  return {
    type: POSTS_SORT,
    sortKey
  }
};

export function addPost(post) {
  return {
    type: POSTS_ADD_REQUESTED,
    post
  };
};
