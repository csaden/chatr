import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {posts} from './app-prop-types';
import Post from './Post';

class PostList extends Component {
  static propTypes = {
    posts: posts,
    sortKey: PropTypes.string.isRequired
  }

  render() {
    const {posts, sortKey} = this.props;
    console.log(sortKey);

    return (
      <ol>
        {_.map(_.sortBy(posts, sortKey), (post) => {
          return <Post key={post.id} post={post}/>
        })}
      </ol>
    );
  }
};

const PostListRedux = connect((state) => ({posts: state.posts}))(PostList);

export {
  PostListRedux as default,
  PostList
}