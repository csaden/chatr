import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import * as types  from './types';
import ReadableAPI from '../services/readable-api';

export function* fetchCategories() {
  const {categories, error} = yield call(ReadableAPI.get, '/categories');
  if (categories) {
    yield put({type: types.CATEGORIES_FETCH_SUCCESS, categories});
  } else {
    yield put({type: types.CATEGORIES_FETCH_FAILED, message: error.message});
  }
};

export function* fetchAllPosts() {
  const resp = yield call(ReadableAPI.get, '/posts');
  if (Array.isArray(resp)) {
    yield put({type: types.POSTS_FETCH_SUCCESS, posts: resp});
  } else {
    const {error} = resp;
    yield put({type: types.POSTS_FETCH_FAILED, message: error.message});
  }
};

export function* addPost(action) {
  const resp = yield call(ReadableAPI.post, '/posts', action.post);
  if (resp.id) {
    yield put({type: types.POSTS_ADD_SUCCESS, post: resp});
  } else {
    const {error} = resp;
    yield put({type: types.POSTS_ADD_FAILED, message: error.message});
  }
};

export function* deletePost(action) {
  const {id} = action;
  const resp = yield call(ReadableAPI.delete, `/posts/${id}`);
  if (resp === '') {
    yield put({type: types.POSTS_DELETE_SUCCESS, id});
  } else {
    const {error} = resp;
    yield put({type: types.POSTS_DELETE_FAILED, message: error.message});
  }
};

export function* editPost(action) {
  const {post} = action;
  const {id} = post;
  const resp = yield call(ReadableAPI.put, `/posts/${id}`, post);
  if (resp.id) {
    yield put({type: types.POSTS_EDIT_SUCCESS, post: resp});
  } else {
    const {error} = resp;
    yield put({type: types.POSTS_EDIT_FAILED, message: error.message});
  }
};

export function* fetchComments(action) {
  const {id} = action;
  const resp = yield call(ReadableAPI.get, `/posts/${id}/comments`);
  if (Array.isArray(resp)) {
    yield put({type: types.COMMENTS_FETCH_SUCCESS, comments: resp, id});
  } else {
    const {error} = resp;
    yield put({type: types.COMMENTS_FETCH_FAILED, message: error.message});
  }
};

export function* addComment(action) {
  const resp = yield call(ReadableAPI.post, '/comments', action.comment);
  if (resp.id) {
    yield put({type: types.COMMENTS_ADD_SUCCESS, comment: resp});
  } else {
    const {error} = resp;
    yield put({type: types.COMMENTS_ADD_FAILED, message: error.message});
  }
};

export function* deleteComment(action) {
  const {id} = action;
  const resp = yield call(ReadableAPI.delete, `/comments/${id}`);
  if (resp.id) {
    yield put({type: types.COMMENTS_DELETE_SUCCESS, comment: resp});
  } else {
    const {error} = resp;
    yield put({type: types.COMMENTS_DELETE_FAILED, message: error.message});
  }
};

export function* editComment(action) {
  const {comment} = action;
  const {id} = comment;
  const resp = yield call(ReadableAPI.put, `/comments/${id}`, comment);
  if (resp.id) {
    yield put({type: types.COMMENTS_EDIT_SUCCESS, comment: resp});
  } else {
    const {error} = resp;
    yield put({type: types.COMMENTS_EDIT_FAILED, message: error.message});
  }
};

export function* votePost(action) {
  const {id, option} = action;
  const resp = yield call(ReadableAPI.post, `/posts/${id}`, {option});
  if (resp.id) {
    yield put({type: types.POSTS_VOTE_SUCCESS, post: resp});
  } else {
    const {error} = resp;
    yield put({type: types.POSTS_VOTE_FAILED, message: error.message});
  }
}

export function* voteComment(action) {
  const {id, option} = action;
  const resp = yield call(ReadableAPI.post, `/comments/${id}`, {option});
  if (resp.id) {
    yield put({type: types.COMMENTS_VOTE_SUCCESS, comment: resp});
  } else {
    const {error} = resp;
    yield put({type: types.COMMENTS_VOTE_FAILED, message: error.message});
  }
}

export default function* rootSaga() {
  yield takeLatest(types.CATEGORIES_REQUESTED, fetchCategories);
  yield takeLatest(types.POSTS_REQUESTED, fetchAllPosts);
  yield takeLatest(types.POSTS_ADD_REQUESTED, addPost);
  yield takeLatest(types.POSTS_DELETE_REQUESTED, deletePost);
  yield takeLatest(types.POSTS_EDIT_REQUESTED, editPost);
  yield takeLatest(types.POSTS_VOTE_REQUESTED, votePost);
  yield takeEvery(types.COMMENTS_REQUESTED, fetchComments);
  yield takeLatest(types.COMMENTS_ADD_REQUESTED, addComment);
  yield takeLatest(types.COMMENTS_DELETE_REQUESTED, deleteComment);
  yield takeLatest(types.COMMENTS_EDIT_REQUESTED, editComment);
  yield takeLatest(types.COMMENTS_VOTE_REQUESTED, voteComment);
};
