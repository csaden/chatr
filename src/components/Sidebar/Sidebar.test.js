import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {shallow} from 'enzyme';

import Sidebar from './Sidebar';

const categories = [];
const div = document.createElement('div');
let props = {
  categories,
  onSelectCategory: jest.fn(),
  selected: null
}

it('renders without crashing', () => {
  ReactDOM.render(<Sidebar {...props}/>, div);
});

it('renders a link with an active class', () => {
  categories.push({name: 'foo', path: '/foo'});
  props = _.assign({}, props, {selected: 'foo'});
  const wrapper = shallow(<Sidebar {...props}/>);
  expect(wrapper.find(Link).length).toBe(1);
  expect(wrapper.find(Link).prop('className')).toEqual('category active');
  expect(wrapper.find('h1').text()).toEqual('chatr');
});

it('calls a onSelectCategory when link is clicked', () => {
  const wrapper = shallow(<Sidebar {...props}/>);
  wrapper.find(Link).simulate('click');
  expect(props.onSelectCategory).toHaveBeenCalledWith('foo');
});