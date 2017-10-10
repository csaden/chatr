import {call, put, takeLatest} from 'redux-saga/effects';

import {
  addPost,
  fetchCategories,
  fetchComments,
  fetchAllPosts
} from './sagas';
import ReadableAPI  from '../services/readable-api';
import * as types from './types';

let gen;

test('#fetchCategories calls ReadableAPI.get at /categories', () => {
  gen = fetchCategories();
  const categories = [{name: 'foo', path: '/foo'}]
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/categories'));
  expect(gen.next({categories}).value).toEqual(put({type: types.CATEGORIES_FETCH_SUCCESS, categories}));
});

test('#fetchCategories puts error message', () => {
  gen = fetchCategories();
  const error = {message: 'foo'};
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/categories'));
  expect(gen.next({error}).value).toEqual(put({type: types.CATEGORIES_FETCH_FAILED, message: 'foo'}));
});

test('#fetchAllPosts calls ReadableAPI.get at /posts', () => {
  gen = fetchAllPosts();
  const posts = [{author: 'foo'}];
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts'));
  expect(gen.next(posts).value).toEqual(put({type: types.POSTS_FETCH_SUCCESS, posts}));
});

test('#fetchAllPosts puts error message', () => {
  gen = fetchAllPosts();
  const error = {message: 'bar'};
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts'));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_FETCH_FAILED, message: 'bar'}));
});

test('#addPost calls ReadableAPI.post at /posts', () => {
  const post = {id: 1, author: 'foo'};
  gen = addPost({post: post});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts', post));
  expect(gen.next(post).value).toEqual(put({type: types.POSTS_ADD_SUCCESS, post}));
});

test('#addPost puts error message', () => {
  const error = {message: 'baz'};
  const post = {title: 'new'};
  gen = addPost({post: post});
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts', post));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_ADD_FAILED, message: 'baz'}));
});

test('#fetchComments calls ReadableAPI.get at /posts/:id/comments', () => {
  const comments = [];
  const id = 1;
  gen = fetchComments({id});
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts/1/comments'));
  expect(gen.next(comments).value).toEqual(put({type: types.COMMENTS_FETCH_SUCCESS, comments, id}));
});

test('#fetchComments puts error message', () => {
  const error = {message: 'qux'}
  const id = 2;
  gen = fetchComments({id});
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/posts/2/comments'));
  expect(gen.next({error}).value).toEqual(put({type: types.COMMENTS_FETCH_FAILED, message: 'qux'}));
});
