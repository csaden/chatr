import {POSTS_FETCH_SUCCESS} from '../types';
import reducer, {initialState, sortPosts} from './posts';
import {POSTS_SORT} from '../types';

it('sets initialState to an empty array', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('updates posts', () => {
  const action = {type: POSTS_FETCH_SUCCESS, posts: [{}]};
  expect(reducer(undefined, action)).toEqual([{}]);
});

it('creates sortPost action', () => {
  expect(sortPosts('foo')).toEqual({
    type: POSTS_SORT,
    sortKey: 'foo'
  });
});
