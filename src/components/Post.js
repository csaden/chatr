import moment from 'moment';
import React, {Component} from 'react';

import {post} from './app-prop-types';
import './Post.css';

export default class Post extends Component {
  static propTypes = {
    post: post
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
  // post comments sorted by highest first
  // comment form inline (not modal)
  // display number of comments
  render() {
    const {post} = this.props;
    console.log(post);

    return (
      <li className='post'>
        <div className='vote-score'>
          <div className='score'>{post.voteScore}</div>
          <div className='votes'>votes</div>
        </div>
        <div className='post-content'>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-body'>{post.body}</p>
          <p className='post-author'>Posted by {post.author} at {moment(post.timestamp).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>

          <div>
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
          {/*<CommentList comments={comments}/>*/}
        </div>
      </li>
    );
  }
}