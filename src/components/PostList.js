import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {posts} from './app-prop-types';
import Post from './Post';

class PostList extends Component {
  static propTypes = {
    posts: posts,
    sortKey: PropTypes.string
  }

  static defaultProps = {
    posts: [],
    sortKey: 'voteScore'
  }

  render() {
    const {category, comments} = this.props;
    const posts = category === 'all' ?
      this.props.posts
      :
      _.filter(this.props.posts, (post) => post.category === category);

    return (
      <ol>
        {_.map(posts, (post) => {
          return (
            <Post
              key={post.id}
              numComments={_.size(comments[post.id])}
              post={post}
            />
          );
        })}
      </ol>
    );
  }
};

const PostListRedux = withRouter(connect(({comments, posts}, {match}) => {
  const category = _.get(match, 'params.category');
  return {
    category,
    comments,
    posts
  };
})(PostList));

export {
  PostListRedux as default,
  PostList
}