import {call, put, takeLatest} from 'redux-saga/effects';

import {
  fetchCategories,
  requestCategories
} from './sagas';
import ReadableAPI  from '../services/readable-api';
import {
  CATEGORIES_FETCH_FAILED,
  CATEGORIES_REQUESTED
} from './types';

const gen = fetchCategories();

test('#fetchCategories calls ReadableAPI at /categories', () => {
  expect(gen.next().value).toEqual(call(ReadableAPI.get, '/categories'));
});

test('#fetchCategories puts error on error', () => {
  const error = new Error('foo');
  expect(gen.throw(error).value).toEqual(put({type: CATEGORIES_FETCH_FAILED, message: 'foo'}));
});

test('#requestCategories', () => {
  const reqCats = requestCategories();

  expect(reqCats.next().value).toEqual(takeLatest(CATEGORIES_REQUESTED, fetchCategories));
});