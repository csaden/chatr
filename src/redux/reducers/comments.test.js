import {COMMENTS_FETCH_SUCCESS} from '../types';
import reducer, {initialState} from './comments';

it('sets the initial state to an empty object', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('updates comments keyed by post id', () => {
  Object.freeze(initialState);
  const comments = [{title: 'bar'}]
  const action = {
    type: COMMENTS_FETCH_SUCCESS,
    id: 'foo',
    comments,
  };
  expect(reducer(undefined, action)).toEqual({
    'foo': comments
  });
});
