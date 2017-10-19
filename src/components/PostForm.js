import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import uuidv4 from 'uuid/v4';

import {comment, post} from './app-prop-types';
import 'react-select/dist/react-select.css';
import './PostForm.css';

class PostForm extends Component {

  static propTypes = {
    data: PropTypes.oneOfType([comment, post]),
    isPost: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    data: {},
    isPost: false,
  }

  state = {
    isOtherCategory: false,
  }

  componentDidMount() {
    const {isPostNew, location} = this.props;
    if (isPostNew) {
      const {pathname} = location;
      const category = _.last(pathname.split('/'));
      if (category !== 'all') {
        this.setState({category});
      }
    }
    this.setState({...this.props.data});
  }

  handleSubmitClick = (e) => {
    e.preventDefault();
    const {category, isOtherCategory, otherCategory} = this.state;
    const post = _.omit(this.state, ['isOtherCategory', 'otherCategory']);
    const {isPost, onSubmit} = this.props;

    if (isPost) {
      post.category = isOtherCategory ? otherCategory : category;
    } else {
      post.parentId = _.get(this.props, 'match.params.post_id');
    }

    post.timestamp = Date.now();
    post.author = 'me';

    if (!post.id) {
      post.id = uuidv4();
    }

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
    const {category, otherCategory, isOtherCategory} = this.state;
    const {categoryNames, isPost, onCancel} = this.props;

    const fields = isPost ? ['title', 'body'] : ['body'];
    const hasFields = _.every(fields, (f) => _.size(this.state[f]) >= 3);
    const hasCategory = !_.isEmpty(category) || !_.isEmpty(otherCategory);
    const isEnabled = isPost ? (hasFields && hasCategory) : hasFields;

    return (
      <form className='form'>
        {_.map(fields, (key, i) => {
          return (
            <div key={key} className='form-control'>
              <label
                className='label'
                htmlFor={`post-${key}`}>
                  {_.startCase(key)}
              </label>
              <textarea
                autoFocus={i === 0}
                className='input'
                id={`post-${key}`}
                onChange={this.handleInputChange}
                rows={key === 'title' ? '1' : '5'}
                cols='50'
                spellCheck={true}
                value={this.state[key] || ''}
              />
            </div>
          );
        })}
        {isPost &&
          <div className='form-control'>
            <label
              className='label'
              htmlFor='post-category'>
                Category
            </label>
            <Select
              className='category-select'
              clearable={false}
              id='post-category'
              options={categoryNames}
              onChange={this.handleCategorySelect}
              placeholder='Category'
              required={true}
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
                  value={otherCategory || ''}
                />
              </div>
            }
          </div>
        }
        <button
          className='post-btn__submit'
          disabled={!isEnabled}
          type='submit'
          onClick={this.handleSubmitClick}>
            submit
        </button>
        <button
          className='post-btn__cancel'
          onClick={onCancel}>
            cancel
        </button>
      </form>
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

const PostFormRedux = withRouter(connect(mapStateToProps)(PostForm));

export {
  PostFormRedux as default,
  PostForm
};
