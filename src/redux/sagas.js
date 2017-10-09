import {call, put, takeLatest} from 'redux-saga/effects';

import * as types  from './types';
import ReadableAPI from '../services/readable-api';

export function* fetchCategories() {
  const {categories, error} = yield call(ReadableAPI.get, '/categories');
  if (categories) {
    yield put({type: types.CATEGORIES_FETCH_SUCCESS, categories});
  } else {
    yield put({type: types.CATEGORIES_FETCH_FAILED, message: error.message});
  }
}

export function* fetchAllPosts() {
  const resp = yield call(ReadableAPI.get, '/posts');
  if (Array.isArray(resp)) {
    yield put({type: types.POSTS_FETCH_SUCCESS, posts: resp});
  } else {
    const {error} = resp;
    yield put({type: types.POSTS_FETCH_FAILED, message: error.message});
  }
}

export function* addPost(action) {
  const resp = yield call(ReadableAPI.post, '/posts', action.post);
  if (resp.id && resp.author) {
    yield put({type: types.POSTS_ADD_SUCCESS, post: resp});
  } else {
    const {error} = resp;
    yield put({type: types.POSTS_ADD_FAILED, message: error.message});
  }
}

export default function* rootSaga() {
  yield takeLatest(types.CATEGORIES_REQUESTED, fetchCategories);
  yield takeLatest(types.POSTS_REQUESTED, fetchAllPosts);
  yield takeLatest(types.POSTS_ADD_REQUESTED, addPost);
}