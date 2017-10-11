import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import Content from './Content';
import {post} from './app-prop-types';
import './Post.css';

export default class Post extends PureComponent {
  static propTypes = {
    numComments: PropTypes.number,
    post: post
  }

  render() {
    const {numComments, post} = this.props;

    return (
      <li className='post'>
        <Content data={post} isPost={true}/>
        <div className='post-details'>
          <Link to={`/post/${post.id}`} className='view-details'>View Details</Link>
          <span className='count-comments'>{numComments} comments</span>
        </div>
      </li>
    );
  }
}
