import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deletePost, editPost} from '../redux/reducers/posts';
import Content from './Content';
import PostForm from './PostForm';
import {post} from './app-prop-types';
import './Post.css';

class Post extends PureComponent {
  static propTypes = {
    numComments: PropTypes.number,
    post: post
  }

  state = {
    isEditingPost: false
  }

  handleCancelClick = (e) => {
    e.preventDefault();
    this.setState({isEditingPost: false});
  }

  handleEditClick = (e) => {
    e.preventDefault();
    this.setState({isEditingPost: true});
  }

  handleDeleteClick = (e) => {
    e.preventDefault();
    const isRemoved = window.confirm('Are you sure you want to delete this post?');
    if (isRemoved) {
      const {post} = this.props;
      const {id} = post;
      this.props.deletePost(id);
    }
  }

  handleSaveEditedClick = (post) => {
    this.props.editPost(post);
    this.setState({isEditingPost: false});
  }

  render() {
    const {numComments, post} = this.props;
    const {isEditingPost} = this.state;

    return (
      <li className='post'>
        {isEditingPost ?
          <PostForm
            data={post}
            isPost={true}
            onSubmit={this.handleSaveEditedClick}
            onCancel={this.handleCancelClick}/>
          :
          <Content data={post} isPost={true}/>
        }
        {!isEditingPost &&
          <div className='buttons'>
            <button
              className='post-btn__edit'
              onClick={this.handleEditClick}>
                edit
            </button>
            <button
              className='post-btn__delete'
              onClick={this.handleDeleteClick}>
                delete
            </button>
          </div>
        }
        <div className='post-details'>
          <Link to={`/${post.category}/${post.id}`} className='view-details'>View Details</Link>
          <span className='count-comments'>{numComments} comments</span>
        </div>
      </li>
    );
  }
}

const PostRedux = connect(null, {deletePost, editPost})(Post);

export {
  PostRedux as default,
  Post
};
