import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import {categories} from '../app-prop-types';
import './Sidebar.css';

export default class Sidebar extends PureComponent {
  static propTypes = {
    categories: categories,
    onSelectCategory: PropTypes.func.isRequired,
    selected: PropTypes.string,
  }

  render() {
    const {
      categories,
      onSelectCategory,
      selected
    } = this.props;

    return (
      <div className='sidebar'>
        <h1 className='title'>chatr</h1>
        {_.map(categories, (category, i) => {
          return (
            <Link
              key={i}
              className={_.isEqual(category.name, selected) ? 'category active' : 'category'}
              onClick={() => onSelectCategory(category.name)}
              to={category.path}>
                {_.capitalize(category.name)}
            </Link>
          );
        })}
      </div>
    );
  }
};
