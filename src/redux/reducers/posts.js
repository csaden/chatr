import _ from 'lodash';
import {
  POSTS_ADD_SUCCESS,
  POSTS_ADD_REQUESTED,
  POSTS_DELETE_REQUESTED,
  POSTS_DELETE_SUCCESS,
  POSTS_EDIT_REQUESTED,
  POSTS_EDIT_SUCCESS,
  POSTS_FETCH_SUCCESS,
  POSTS_VOTE_REQUESTED,
  POSTS_VOTE_SUCCESS,
  POSTS_SORT
} from '../types';

export const initialState = [];

export default function posts(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return action.posts;
    case POSTS_ADD_SUCCESS:
      return _.concat(state, action.post);
    case POSTS_DELETE_SUCCESS:
      return _.filter(state, (post) => post.id !== action.id);
    case POSTS_VOTE_SUCCESS:
    case POSTS_EDIT_SUCCESS:
      const {post} = action;
      return _.map(state, (p) => p.id === post.id ? post : p);
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

export function deletePost(id) {
  return {
    type: POSTS_DELETE_REQUESTED,
    id,
  };
};

export function editPost(post) {
  return {
    type: POSTS_EDIT_REQUESTED,
    post
  };
};

export function votePost({id, option}) {
  return {
    type: POSTS_VOTE_REQUESTED,
    id,
    option
  };
};
