import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
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
    selected: 'all',
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

  handleSelectCategory = (selected) => {
    this.setState({selected});
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
    const {categories, children} = this.props;
    const {isAddingPost, selected, sortKey} = this.state;

    return (
      <div className='flex'>
        <Sidebar
          className='sidebar'
          categories={categories}
          selected={selected}
          onSelectCategory={this.handleSelectCategory}/>
        <div className='content'>
          <h2 className='header'>Category: {_.startCase(selected)}</h2>
          <div className='container'>
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
          {isAddingPost &&
            <PostForm
              onCancel={this.handleCancelClick}
              onSubmit={this.handleSubmitPostClick}
            />
          }
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
