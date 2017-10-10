import {CATEGORIES_FETCH_SUCCESS} from '../types';
import reducer, {initialState} from './categories';

it('sets the initial state to an empty array', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('updates the categories and returns an \'all\' category', () => {
  Object.freeze(initialState);
  const categories = [{name: 'foo', path: 'foo'}];
  const action = {
    type: CATEGORIES_FETCH_SUCCESS,
    categories
  };
  expect(reducer(undefined, action)).toEqual([
    {name: 'all', path: 'all'},
    {name: 'foo', path: 'foo'}
  ]);
});
