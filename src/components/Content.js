import moment from 'moment';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import {comment, post} from './app-prop-types';
import './Content.css';

export default class PostBasic extends PureComponent {
  static propTypes = {
    data: PropTypes.oneOfType([comment, post])
  }

  static defaultProps = {
    data: {}
  }

  render() {
    const {data} = this.props;

    return (
      <div className='content-container'>
        <div className='vote-score'>
          <div className='score'>{data.voteScore}</div>
          <div className='votes'>votes</div>
        </div>
        <div className='content'>
          <h3 className='content-title'>{data.title}</h3>
          <p className='content-body'>{data.body}</p>
          <p className='content-author'>Posted by {data.author} at {moment(data.timestamp).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
        </div>
      </div>
    );
  }
}
