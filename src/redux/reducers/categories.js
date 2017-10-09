import {CATEGORIES_FETCH_SUCCESS, CATEGORIES_FETCH_FAILED} from '../types';

export const initialState = [];

export default function categories(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      action.categories.unshift({name: 'all', path: 'all'});
      return action.categories;
    case CATEGORIES_FETCH_FAILED:
      return state;
    default:
      return state;
  }
};
