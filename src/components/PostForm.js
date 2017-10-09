import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import uuidv4 from 'uuid/v4';

import {addPost} from '../redux/reducers/posts';

import 'react-select/dist/react-select.css';
import './PostForm.css';

const POST_FIELDS = [
  'title',
  'body'
];

class PostForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
    isOtherCategory: false,
    isSaving: false
  }

  handleSubmitClick = (e) => {
    e.preventDefault();
    this.setState({isSaving: true});
    const {category, isOtherCategory, otherCategory} = this.state
    const {onSubmit} = this.props;
    const post = _.pick(this.state, POST_FIELDS);
    post.timestamp = Date.now();
    post.author = 'me';
    post.id = uuidv4();
    post.category = isOtherCategory ? otherCategory : category;
    onSubmit(post);
  }

  handleInputChange = (e) => {
    const value = _.get(e, 'target.value');
    const key = _.get(e, 'target.id').replace('post-', '');
    this.setState({[key]: value});
  }

  handleCategorySelect = (option) => {
    const category = _.get(option, 'value', null);
    const isOtherCategory = category === 'other';
    this.setState({isOtherCategory, category});
  }

  render() {
    const {category, otherCategory, isOtherCategory, isSaving} = this.state;
    const {categoryNames, onCancel} = this.props;

    return (
      <div className='form'>
        {_.map(POST_FIELDS, (key) => {
          return (
            <div key={key} className='form-control'>
              <label
                className='label'
                htmlFor={`post-${key}`}>
                  {_.startCase(key)}
              </label>
              <input
                className='input'
                id={`post-${key}`}
                onChange={this.handleInputChange}
                type='text'
                value={this.state[key] || ''}
              />
            </div>
          );
        })}
        <div>
          <Select
            className='category-select'
            clearable={false}
            options={categoryNames}
            onChange={this.handleCategorySelect}
            placeholder='Category'
            value={category}
          />
          {isOtherCategory &&
            <div className='form-control'>
              <label
                className='label'
                htmlFor='post-category'>
                  Category
              </label>
              <input
                className='input'
                id='post-otherCategory'
                onChange={this.handleInputChange}
                value={this.state.otherCategory || ''}
              />
            </div>
          }
        </div>
        <button
          className='post-btn__submit'
          disabled={isSaving}
          onClick={this.handleSubmitClick}>
            submit
        </button>
        <button
          className='post-btn__cancel'
          onClick={onCancel}>
            cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({categories}) => {
  return {
    categoryNames: _.map(_.drop(categories), (category) => {
      return {label: category.name, value: category.name};
    }).concat({label: 'other', value: 'other'})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post))
  };
}

const PostFormRedux = connect(mapStateToProps, mapDispatchToProps)(PostForm);

export {
  PostFormRedux as default,
  PostForm
};
