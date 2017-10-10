import _ from 'lodash';
import React, {Component} from 'react';

import {comments} from './app-prop-types';
import Comment from './Comment';

export default class CommentList extends Component {
  static propTypes = {
    comments: comments
  }

  render() {
    const {comments} = this.props;

    return (
      <div>
        {_.map(_.orderBy(comments, ['voteScore'], ['desc']), (comment) => {
          return (
            <Comment key={comment.id} comment={comment}/>
          );
        })}
      </div>
    );
  }
}
