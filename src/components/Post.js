import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Content from './Content';
import {post} from './app-prop-types';
import './Post.css';

export default class Post extends Component {
  static propTypes = {
    post: post
  }

  render() {
    const {post} = this.props;

    return (
      <li className='post'>
        <Link to={`/post/${post.id}`} className='curtain'/>
        <Content data={post}/>
      </li>
    );
  }
}
