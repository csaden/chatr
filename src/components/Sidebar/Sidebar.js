import _ from 'lodash';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {categories} from '../app-prop-types';
import './Sidebar.css';

export default class Sidebar extends Component {
  static propTypes = {
    categories: categories
  }

  static defaultProps = {
    categories: []
  }

  render() {
    const {categories} = this.props;

    return (
      <div className='sidebar'>
        <h1 className='title'>chatr</h1>
        <ul>
        {_.map(categories, (category) => {
          return (
            <li key={category.name}>
              <NavLink
                exact
                className='category'
                to={`/category/${category.path}`}>
                  {_.capitalize(category.name)}
              </NavLink>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
};
