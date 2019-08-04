import 'react-select/dist/react-select.css';
import './PostForm.css';

import React, { Component } from 'react';
import { comment, post } from './app-prop-types';

import FileReader from '../helpers/file-reader';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _ from 'lodash';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { withRouter } from 'react-router-dom';

class PostForm extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([comment, post]),
    isPost: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    data: {},
    isPost: false
  };

  state = {
    isOtherCategory: false,
    images: []
  };

  componentDidMount() {
    const { isPostNew, location } = this.props;
    if (isPostNew) {
      const { pathname } = location;
      const category = _.last(pathname.split('/'));
      if (category !== 'all') {
        this.setState({ category });
      }
    }
    this.setState({ ...this.props.data });
  }

  handleDropImages = image => {
    const { images } = this.state;
    FileReader.encodeImageFileAsURL(image).then(url => {
      this.setState({ images: _.concat(images, url) });
    });
  };

  handleSubmitClick = e => {
    e.preventDefault();
    const { category, isOtherCategory, otherCategory, images } = this.state;
    const post = _.omit(this.state, ['isOtherCategory', 'otherCategory']);
    const { isPost, onSubmit } = this.props;

    if (isPost) {
      post.category = isOtherCategory ? otherCategory : category;
    } else {
      post.parentId = _.get(this.props, 'match.params.post_id');
    }

    post.timestamp = Date.now();
    post.author = 'me';
    post.images = images;

    if (!post.id) {
      post.id = uuidv4();
    }

    onSubmit(post);
  };

  handleInputChange = e => {
    const value = _.get(e, 'target.value');
    const key = _.get(e, 'target.id').replace('post-', '');
    this.setState({ [key]: value });
  };

  handleCategorySelect = option => {
    const category = _.get(option, 'value', null);
    const isOtherCategory = category === 'other';
    this.setState({ isOtherCategory, category });
  };

  render() {
    const { category, otherCategory, isOtherCategory, images } = this.state;
    const { categoryNames, isPost, onCancel } = this.props;

    const fields = isPost ? ['title', 'body'] : ['body'];
    const hasFields = _.every(fields, f => _.size(this.state[f]) >= 3);
    const hasCategory = !_.isEmpty(category) || !_.isEmpty(otherCategory);
    const isEnabled = isPost ? hasFields && hasCategory : hasFields;

    return (
      <form className="form">
        {_.map(fields, (key, i) => {
          return (
            <div key={key} className="form-control">
              <label className="label" htmlFor={`post-${key}`}>
                {_.startCase(key)}
              </label>
              <textarea
                autoFocus={i === 0}
                className="input"
                id={`post-${key}`}
                onChange={this.handleInputChange}
                rows={key === 'title' ? '1' : '5'}
                cols="50"
                spellCheck={true}
                value={this.state[key] || ''}
              />
            </div>
          );
        })}
        {_.map(images, image => {
          return <img src={image} width={100} height={100} />;
        })}
        <div>
          <label className="label" />
          <ImageUploader
            withIcon={false}
            buttonText="Choose images"
            onChange={this.handleDropImages}
            imgExtensions={['.jpg', '.png', '.jpeg']}
            label="Max file size: 5MB. Accept JPG, JPEG, PNG"
            maxFileSize={5242880} // 5MB
          />
        </div>
        {isPost && (
          <div className="form-control">
            <label className="label" htmlFor="post-category">
              Category
            </label>
            <Select
              className="category-select"
              clearable={false}
              id="post-category"
              options={categoryNames}
              onChange={this.handleCategorySelect}
              placeholder="Category"
              required={true}
              value={category}
            />
            {isOtherCategory && (
              <div className="form-control">
                <label className="label" htmlFor="post-category">
                  Category
                </label>
                <input
                  className="input"
                  id="post-otherCategory"
                  onChange={this.handleInputChange}
                  value={otherCategory || ''}
                />
              </div>
            )}
          </div>
        )}
        <button
          className="post-btn__submit"
          disabled={!isEnabled}
          type="submit"
          onClick={this.handleSubmitClick}
        >
          submit
        </button>
        <button className="post-btn__cancel" onClick={onCancel}>
          cancel
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categoryNames: _.map(_.drop(categories), category => {
      return { label: category.name, value: category.name };
    }).concat({ label: 'other', value: 'other' })
  };
};

const PostFormRedux = withRouter(connect(mapStateToProps)(PostForm));

export { PostFormRedux as default, PostForm };
