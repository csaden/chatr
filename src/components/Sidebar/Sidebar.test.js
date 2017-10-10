import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';
import {shallow} from 'enzyme';

import Sidebar from './Sidebar';

const categories = [];
const div = document.createElement('div');
let props = {categories}

it('renders without crashing', () => {
  ReactDOM.render(<Sidebar {...props}/>, div);
});

it('renders a Nav Link', () => {
  categories.push({name: 'foo', path: '/foo'});
  const wrapper = shallow(<Sidebar {...props}/>);
  const link = wrapper.find(NavLink);
  expect(link.length).toBe(1);
  expect(link.prop('className')).toEqual('category');
  expect(wrapper.find('h1').text()).toEqual('chatr');
});
