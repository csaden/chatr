import _ from 'lodash';
import React, {PureComponent} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import {categories} from '../app-prop-types';
import './Sidebar.css';

export default class Sidebar extends PureComponent {
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
        {_.map(categories, (category) => {
          return (
            <NavLink
              key={category.name}
              activeClassName='active'
              className='category'
              to={`/category/${category.path}`}>
                {_.capitalize(category.name)}
            </NavLink>
          );
        })}
      </div>
    );
  }
};
