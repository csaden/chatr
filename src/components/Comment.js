import React, { Component } from 'react';
import {connect} from 'react-redux';

import {deleteComment, editComment} from '../redux/reducers/comments';
import Content from './Content';
import PostForm from './PostForm';
import {comment} from './app-prop-types';
import './Comment.css';

class Comment extends Component {
  static propTypes = {
    comment: comment
  }

  state = {
    isEditingComment: false
  }

  handleEditClick = (e) => {
    e.preventDefault();
    this.setState({isEditingComment: true});
  }

  handleCancelClick = (e) => {
    e.preventDefault();
    this.setState({isEditingComment: false});
  }

  handleDeleteClick = (e) => {
    e.preventDefault();
    const {comment, deleteComment} = this.props;
    const isRemoved = window.confirm('Are you sure you want to delete this comment?');
    if (isRemoved) {
      deleteComment(comment.id);
    }
  }

  handleSaveEditComment = (comment) => {
    this.props.editComment(comment);
    this.setState({isEditingComment: false});
  }

  render() {
    const {comment} = this.props;
    const {isEditingComment} = this.state;

    return (
      <div className='comment'>
        {isEditingComment ?
          <PostForm
            data={comment}
            onSubmit={this.handleSaveEditComment}
            onCancel={this.handleCancelClick}/>
          :
          <Content data={comment} isPost={false}/>
        }
        {!isEditingComment &&
          <div className='buttons'>
            <button
              className='comment-btn__edit'
              onClick={this.handleEditClick}>
                edit
            </button>
            <button
              className='comment-btn__delete'
              onClick={this.handleDeleteClick}>
                delete
            </button>
          </div>
        }
      </div>
    );
  }
}

const CommentRedux = connect(null, {deleteComment, editComment})(Comment);

export {
  CommentRedux as default,
  Comment
};
