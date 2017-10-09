import {call, put, takeLatest} from 'redux-saga/effects';

import {
  addPost,
  fetchCategories,
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
  const post = {title: 'new'};
  gen = addPost(post);
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts', post));
  expect(gen.next({post}).value).toEqual(put({type: types.POSTS_ADD_SUCCESS, post}));
});

test('#addPost puts error message', () => {
  const error = {message: 'baz'};
  const post = {title: 'new'};
  gen = addPost(post);
  expect(gen.next().value).toEqual(call(ReadableAPI.post, '/posts', post));
  expect(gen.next({error}).value).toEqual(put({type: types.POSTS_ADD_FAILED, message: 'baz'}));
});
