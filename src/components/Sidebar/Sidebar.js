import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {categories} from '../app-prop-types';
import './Sidebar.css';

class Sidebar extends PureComponent {
  static propTypes = {
    categories: categories
  }

  static defaultProps = {
    categories: []
  }

  render() {
    const {
      categories,
      location
    } = this.props;

    const selected = _.last(location.pathname.split('/'));

    return (
      <div className='sidebar'>
        <h1 className='title'>chatr</h1>
        {_.map(categories, (category) => {
          return (
            <Link
              key={category.name}
              className={_.isEqual(category.name, selected) ? 'category active' : 'category'}
              to={`/category/${category.path}`}>
                {_.capitalize(category.name)}
            </Link>
          );
        })}
      </div>
    );
  }
};

const SidebarRouter = withRouter(Sidebar);

export {
  SidebarRouter as default,
  Sidebar
};
