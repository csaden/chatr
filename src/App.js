import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';

import {categories, posts} from './components/app-prop-types';
import Sidebar from './components/Sidebar/Sidebar';
import PostForm from './components/PostForm';
import {
  CATEGORIES_REQUESTED,
  POSTS_REQUESTED
} from './redux/types';
import {addPost, sortPosts} from './redux/reducers/posts';

import 'react-select/dist/react-select.css';
import './App.css';

const SORT_OPTIONS = [
  {label: 'Date', value: 'timestamp'},
  {label: 'Votes', value: 'voteScore'}
];

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
    isAddingPost: false,
    sortKey: 'voteScore'
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: CATEGORIES_REQUESTED});
    dispatch({type: POSTS_REQUESTED});
  }

  componentWillReceiveProps(nextProps) {
    if (_.size(this.props.posts) < _.size(nextProps.posts)) {
      this.props.dispatch(sortPosts(this.state.sortKey));
    }
  }

  handleAddPostClick = (e) => {
    e.preventDefault();
    this.setState({isAddingPost: true});
  }

  handleSubmitPostClick = (post) => {
    this.props.dispatch(addPost(post));
    this.setState({isAddingPost: false});
  }

  handleCancelClick = (e) => {
    e.preventDefault();
    this.setState({isAddingPost: false});
  }

  handleSelectSort = (option) => {
    const sortKey = _.get(option, 'value', 'voteScore');
    this.setState({sortKey});
    this.props.dispatch(sortPosts(sortKey));
  }

  render() {
    const {categories, children, location} = this.props;
    const {isAddingPost, sortKey} = this.state;

    const parts = _.drop(location.pathname.split('/'));
    const header = _.first(parts) === 'post' ? 'Post Detail' : `Category: ${_.startCase(_.last(parts))}`

    return (
      <div className='flex'>
        <Sidebar
          className='sidebar'
          categories={categories}
        />
        <div className='app-content'>
          <h2 className='app-header'>{header}</h2>
          {_.includes(location.pathname, '/category/') &&
            <div className='app-container'>
              <button
                className='post-btn__add'
                onClick={this.handleAddPostClick}>
                  add post
              </button>
              <span className='sort'>Sort by</span>
              <Select
                name='sort-key-select'
                onChange={this.handleSelectSort}
                options={SORT_OPTIONS}
                className='sort-select'
                clearable={false}
                value={sortKey}
              />
            </div>
          }
          {isAddingPost &&
            <PostForm
              onCancel={this.handleCancelClick}
              onSubmit={this.handleSubmitPostClick}
            />
          }
          {children}
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({categories, posts}) => {
  return {
    categories,
    posts
  };
};

const AppWithRedux = withRouter(connect(mapStateToProps)(App));

export {
  AppWithRedux as default,
  App
};
