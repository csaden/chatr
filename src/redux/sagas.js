import {all, call, put, takeLatest} from 'redux-saga/effects';

import * as types  from './types';
import ReadableAPI from '../services/readable-api';

export function* fetchCategories() {
  try {
    const data = yield call(ReadableAPI.get, '/categories');
    yield put({type: types.CATEGORIES_FETCH_SUCCESS, categories: data.categories});
  } catch (e) {
    yield put({type: types.CATEGORIES_FETCH_FAILED, message: e.message});
  }
}

export function* requestCategories() {
  yield takeLatest(types.CATEGORIES_REQUESTED, fetchCategories);
}

export default function* sagas() {
  yield all([
    requestCategories()
  ]);
}
