import React, { Component } from 'react';

import Content from './Content';
import {comment} from './app-prop-types';
import './Comment.css';

export default class Comment extends Component {
  static propTypes = {
    comment: comment
  }

  render() {
    const {comment} = this.props;

    return (
      <div className='comment'>
        <Content data={comment}/>
      </div>
    );
  }
}