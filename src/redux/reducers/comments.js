import _ from 'lodash';
import {
  COMMENTS_ADD_REQUESTED,
  COMMENTS_ADD_SUCCESS,
  COMMENTS_DELETE_REQUESTED,
  COMMENTS_DELETE_SUCCESS,
  COMMENTS_EDIT_REQUESTED,
  COMMENTS_EDIT_SUCCESS,
  COMMENTS_FETCH_SUCCESS,
  COMMENTS_VOTE_REQUESTED,
  COMMENTS_VOTE_SUCCESS,
  COMMENTS_REQUESTED
} from '../types';

export const initialState = {};

export default function comments(state = initialState, action) {
  let comments, id, parentId;

  switch (action.type) {
    case COMMENTS_ADD_SUCCESS:
      parentId = _.get(action, 'comment.parentId');
      comments = _.concat(state[parentId], action.comment);
      return {...state, ...{[parentId]: comments}};
    case COMMENTS_DELETE_SUCCESS:
      id = _.get(action, 'comment.id');
      parentId = _.get(action, 'comment.parentId');
      comments =_.filter(state[parentId], (comment) => comment.id !== id);
      return {...state, ...{[parentId]: comments}};
    case COMMENTS_VOTE_SUCCESS:
    case COMMENTS_EDIT_SUCCESS:
      id = _.get(action, 'comment.id');
      parentId = _.get(action, 'comment.parentId');
      comments = _.filter(state[parentId], (comment) => comment.id !== id);
      comments.push(action.comment);
      return {...state, ...{[parentId]: comments}}
    case COMMENTS_FETCH_SUCCESS:
      return {...state, ...{[action.id]: action.comments}};
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

export function addComment(comment) {
  return {
    type: COMMENTS_ADD_REQUESTED,
    comment
  };
};

export function deleteComment(id) {
  return {
    type: COMMENTS_DELETE_REQUESTED,
    id
  };
};

export function editComment(comment) {
  return {
    type: COMMENTS_EDIT_REQUESTED,
    comment
  };
};

export function voteComment({id, option}) {
  return {
    type: COMMENTS_VOTE_REQUESTED,
    id,
    option
  };
};
