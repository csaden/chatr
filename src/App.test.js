import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';

import {App} from './App';
import Sidebar from './components/Sidebar/Sidebar';
import {CATEGORIES_REQUESTED} from './redux/types';

const dispatch = jest.fn();
const props = {dispatch, location: {pathname: '/category/all'}};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App {...props}/>, div);
});

it('renders Sidebar and content', () => {
  const wrapper = shallow(<App {...props}/>);
  expect(wrapper.find(Sidebar).length).toBe(1);
  expect(wrapper.find('.flex').length).toBe(1);
  expect(wrapper.find('.content').length).toBe(1);
});

it('dispatches request for categories on mount', () => {
  const didMountSpy = jest.spyOn(App.prototype, 'componentDidMount');

  mount(<App {...props}/>);
  expect(didMountSpy).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({type: CATEGORIES_REQUESTED});
});
