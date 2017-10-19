import moment from 'moment';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {voteComment} from '../redux/reducers/comments';
import {votePost} from '../redux/reducers/posts';
import {comment, post} from './app-prop-types';
import './Content.css';

class Content extends PureComponent {
  static propTypes = {
    data: PropTypes.oneOfType([comment, post]),
    isPost: PropTypes.bool
  }

  static defaultProps = {
    data: {},
    isPost: false
  }

  handleUpVoteClick = (e) => {
    e.preventDefault();
    const {data, isPost} = this.props;
    const {id} = data;
    isPost ?
      this.props.votePost({id, option: 'upVote'})
      :
      this.props.voteComment({id, option: 'upVote'});
  }

  handleDownVoteClick = (e) => {
    e.preventDefault();
    const {data, isPost} = this.props;
    const {id} = data;
    isPost ?
      this.props.votePost({id, option: 'downVote'})
      :
      this.props.voteComment({id, option: 'downVote'});
  }

  render() {
    const {data, isPost} = this.props;

    return (
      <div className='content-container'>
        <div className='vote-container'>
          <button
            className='vote-up'
            onClick={this.handleUpVoteClick}
          />
          <div className='vote-score'>
            <div className='score'>{data.voteScore}</div>
            <div className='votes'>votes</div>
          </div>
          <button
            className='vote-down'
            onClick={this.handleDownVoteClick}
          />
        </div>
        <div className='content'>
          {isPost &&
            <h3 className='content-title'>{data.title}</h3>
          }
          <p className='content-body'>{data.body}</p>
          <p className='content-author'>Chattr from {data.author} at {moment(data.timestamp).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
        </div>
      </div>
    );
  }
}

const ContentRedux = connect(null, {voteComment, votePost})(Content);

export {
  ContentRedux as default,
  Content
};
