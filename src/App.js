import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {categories, posts} from './components/app-prop-types';
import Sidebar from './components/Sidebar/Sidebar';
import {
  CATEGORIES_REQUESTED,
  POSTS_REQUESTED
} from './redux/types';
import {sortPosts} from './redux/reducers/posts';
import './App.css';

class App extends Component {

  static propTypes = {
    categories: categories,
    posts: posts
  }

  static defaultProps = {
    categories: [],
    posts: []
  }

  state = {
    selected: 'all',
    sortKey: 'voteScore'
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: CATEGORIES_REQUESTED});
    dispatch({type: POSTS_REQUESTED});
  }

  handleSelectCategory = (selected) => {
    this.setState({selected});
  }

  handleSelectSort = (e) => {
    const sortKey = _.get(e, 'target.value');
    this.setState({sortKey});
    this.props.dispatch(sortPosts(sortKey));
  }

  render() {
    const {categories, children} = this.props;
    const {selected, sortKey} = this.state;

    return (
      <div className='flex'>
        <Sidebar
          className='sidebar'
          categories={categories}
          selected={selected}
          onSelectCategory={this.handleSelectCategory}/>
        <div className='content'>
          <h2 className='header'>Category: {_.startCase(selected)}</h2>
          <div className='sort-container'>
            <span className='sort'>Sort by</span>
            <select onChange={this.handleSelectSort}>
              <option value='timestamp'>Date</option>
              <option value='voteScore'>Votes</option>
            </select>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({categories, posts}) => ({categories, posts});

const AppWithRedux = connect(mapStateToProps)(App);

export {
  AppWithRedux as default,
  App
};
