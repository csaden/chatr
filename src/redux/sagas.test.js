import {call, put, takeLatest} from 'redux-saga/effects';

import {
  addComment,
  addPost,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  fetchCategories,
  fetchComments,
  fetchAllPosts,
  voteComment,
  votePost
} from './sagas';
import ReadableAPI  from '../services/readable-api';
import * as types from './types';

let gen;
const id = 1;
const error = {message: 'bar'};
const option = 'upVote';

test('#fetchCategories calls ReadableAPI.get at /categories', () => {
  gen = fetchCategories();
  const categories = [{name: 'foo', path: '/foo'}]
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/categories'));
  expect(gen.next({categories}).value).toEqual(put({type: types.CATEGORIES_FETCH_SUCCESS, categories}));
});

test('#fetchCategories puts error message', () => {
  gen = fetchCategories();
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/categories'));
  expect(gen.next({error}).value).toEqual(put({type: types.CATEGORIES_FETCH_FAILED, message: 'bar'}));
});

test('#fetchAllPosts calls ReadableAPI.get at /posts', () => {
  gen = fetchAllPosts();
  const posts = [{author: 'foo'}];
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts'));
  expect(gen.next(posts).value).toEqual(put({type: types.POSTS_FETCH_SUCCESS, posts}));
});

test('#fetchAllPosts puts error message', () => {
  gen = fetchAllPosts();
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts'));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_FETCH_FAILED, message: 'bar'}));
});

test('#addPost calls ReadableAPI.post at /posts', () => {
  const post = {id};
  gen = addPost({post});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts', post));
  expect(gen.next(post).value).toEqual(put({type: types.POSTS_ADD_SUCCESS, post}));
});

test('#addPost puts error message', () => {
  const post = {id};
  gen = addPost({post: post});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts', post));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_ADD_FAILED, message: 'bar'}));
});

test('#deletePost calls ReadableAPI.delete at /posts/:id', () => {
  const post = {id};
  gen = deletePost(post);
  expect(gen.next().value).toEqual(call(ReadableAPI.delete, '/posts/1'));
  expect(gen.next('').value).toEqual(put({type: types.POSTS_DELETE_SUCCESS, id}));
});

test('#deletePost puts error message', () => {
  gen = deletePost({id});
  expect(gen.next().value).toEqual(call(ReadableAPI.delete, '/posts/1'));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_DELETE_FAILED, message: 'bar'}));
});

test('#editPost calls ReadableAPI.put at /posts/:id', () => {
  const post = {id};
  gen = editPost({post});
  expect(gen.next().value).toEqual(call(ReadableAPI.put, '/posts/1', post));
  expect(gen.next(post).value).toEqual(put({type: types.POSTS_EDIT_SUCCESS, post}));
});

test('#editPost puts error message', () => {
  const post = {id};
  gen = editPost({post});
  expect(gen.next().value).toEqual(call(ReadableAPI.put, '/posts/1', post));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_EDIT_FAILED, message: 'bar'}));
});

test('#votePost calls ReadableAPI.post /posts/:id', () => {
  const post = {id};
  gen = votePost({id, option});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts/1', {option}));
  expect(gen.next(post).value).toEqual(put({type: types.POSTS_VOTE_SUCCESS, post}));
});

test('#votePost puts error message', () => {
  gen = votePost({id, option});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts/1', {option}));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_VOTE_FAILED, message: 'bar'}));
});

test('#fetchComments calls ReadableAPI.get at /posts/:id/comments', () => {
  const comments = [];
  gen = fetchComments({id});
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts/1/comments'));
  expect(gen.next(comments).value).toEqual(put({type: types.COMMENTS_FETCH_SUCCESS, comments, id}));
});

test('#fetchComments puts error message', () => {
  gen = fetchComments({id});
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts/1/comments'));
  expect(gen.next({error}).value).toEqual(put({type: types.COMMENTS_FETCH_FAILED, message: 'bar'}));
});

test('addComment calls ReadableAPI.post at /comments', () => {
  const comment = {id};
  gen = addComment({comment});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/comments', comment));
  expect(gen.next(comment).value).toEqual(put({type: types.COMMENTS_ADD_SUCCESS, comment}));
});

test('#addComment puts error message', () => {
  const comment = {id};
  gen = addComment({comment});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/comments', comment));
  expect(gen.next({error}).value).toEqual(put({type: types.COMMENTS_ADD_FAILED, message: 'bar'}));
});

test('#deleteComment calls ReadableAPI.delete at /comments/:id', () => {
  const comment = {id};
  gen = deleteComment(comment);
  expect(gen.next().value).toEqual(call(ReadableAPI.delete, `/comments/${id}`));
  expect(gen.next(comment).value).toEqual(put({type: types.COMMENTS_DELETE_SUCCESS, comment}));
});

test('#deleteComment puts error message', () => {
  const comment = {id};
  gen = deleteComment(comment);
  expect(gen.next().value).toEqual(call(ReadableAPI.delete, `/comments/${id}`));
  expect(gen.next({error}).value).toEqual(put({type: types.COMMENTS_DELETE_FAILED, message: 'bar'}));
});

test('#editComment calls ReadableAPI.put at /comments/:id', () => {
  const comment = {id};
  gen = editComment({comment});
  expect(gen.next().value).toEqual(call(ReadableAPI.put, '/comments/1', comment));
  expect(gen.next(comment).value).toEqual(put({type: types.COMMENTS_EDIT_SUCCESS, comment}));
});

test('#editComment puts error message', () => {
  const comment = {id};
  gen = editComment({comment});
  expect(gen.next().value).toEqual(call(ReadableAPI.put, '/comments/1', comment));
  expect(gen.next({error}).value).toEqual(put({type: types.COMMENTS_EDIT_FAILED, message: 'bar'}));
});

test('#voteComment calls ReadableAPI.post /comments/:id', () => {
  const comment = {id};
  gen = voteComment({id, option});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/comments/1', {option}));
  expect(gen.next(comment).value).toEqual(put({type: types.COMMENTS_VOTE_SUCCESS, comment}));
});

test('#voteComment puts error message', () => {
  gen = voteComment({id, option});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/comments/1', {option}));
  expect(gen.next({error}).value).toEqual(put({type: types.COMMENTS_VOTE_FAILED, message: 'bar'}));
});
