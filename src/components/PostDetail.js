import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import {addComment, deleteComment} from '../redux/reducers/comments';
import {deletePost, editPost} from '../redux/reducers/posts';
import CommentList from './CommentList';
import Content from './Content';
import PostForm from './PostForm';
import {comments, post} from './app-prop-types';
import './PostDetail.css';

class PostDetail extends Component {

  static propTypes = {
    comments: comments,
    post: post,
  }

  static defaultProps = {
    comments: [],
    post: {}
  }

  state = {
    isAddingComment: false,
    isDeleted: false,
    isEditingPost: false
  }

  handleCommentClick = (e) => {
    e.preventDefault();
    this.setState({isAddingComment: true});
  }

  handleCancelClick = () => {
    this.setState({isAddingComment: false, isEditingPost: false});
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
      this.setState({isDeleted: true});
    }
  }

  handleSaveEditedClick = (post) => {
    this.props.editPost(post);
    this.setState({isEditingPost: false});
  }

  handleSubmitCommentClick = (comment) => {
    this.props.addComment(comment);
    this.setState({isAddingComment: false});
  }

  render() {
    const {post, comments} = this.props;
    const {isAddingComment, isDeleted, isEditingPost} = this.state;

    if (isDeleted) {
      return <Redirect to='/categories/all' push={true}/>
    }

    return (
      <div className='post-detail'>
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
              className='post-btn__comment'
              onClick={this.handleCommentClick}>
                comment
            </button>
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
        {isAddingComment &&
          <PostForm
            onCancel={this.handleCancelClick}
            onSubmit={this.handleSubmitCommentClick}
          />
        }
        <CommentList comments={comments}/>
      </div>
    );
  }
}

const mapStateToProps = ({comments, posts}, {match}) => {
  const id = _.get(match, 'params.post_id');
  return {
    comments: comments[id] || [],
    post: _.find(posts, ['id', id])
  };
};

const PostDetailRedux = withRouter(connect(mapStateToProps, {
  addComment,
  deleteComment,
  deletePost,
  editPost
})(PostDetail));

export {
  PostDetailRedux as default,
  PostDetail
};
