import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import CommentList from './CommentList';
import Content from './Content';
import {comments, post} from './app-prop-types';
import './PostDetail.css';

class PostDetail extends PureComponent {

  static propTypes = {
    comments: comments,
    post: post,
  }

  static defaultProps = {
    comments: [],
    post: {}
  }

  handleCommentClick = (e) => {
    e.preventDefault();
  }

  handleEditClick = (e) => {
    e.preventDefault();
  }

  handleDeleteClick = (e) => {
    e.preventDefault();
  }

  render() {
    const {post, comments} = this.props;
    // post comments sorted by highest first
    // comment form inline (not modal)
    // display number of comments
    return (
      <div className='post-detail'>
        <Content data={post}/>
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
        <CommentList comments={comments}/>
      </div>
    );
  }
}

const mapStateToProps = ({comments, posts}, {match}) => {
  const id = _.get(match, 'params.id');
  return {
    comments: comments[id] || [],
    post: _.find(posts, ['id', id])
  };
};

const PostDetailRedux = connect(mapStateToProps)(PostDetail);

export {
  PostDetailRedux as default,
  PostDetail
};
