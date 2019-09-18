import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Comment.css';

const comment = 'comment';
const bemClasses = getBEMClasses([comment]);

class Comment extends React.Component {
  renderCommentInformation() {
    const { CreatedAt, UserId } = this.props.comment;
    const { users } = this.props;

    const publishingDate = format(CreatedAt, 'MMM D, YYYY');

    return (
      <div className={bemClasses('info')}>
        {'By '}
        <Link to={`/profile/${UserId}`} data-cy="comment-author">
          {users[UserId]}
        </Link>
        <span data-cy="comment-publication-date">{` / Wrote ${publishingDate}`}</span>
      </div>
    );
  }

  renderCommentBody() {
    const { Text } = this.props.comment;
    let text = Text;

    if (text.length > 350) {
      text = text.slice(0, 350);
      text += '...';
    }

    return (
      <React.Fragment>
        <div className={bemClasses('comment-content')}>
          {this.renderCommentInformation()}
          <div className={bemClasses('description')}>
            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={bemClasses('container', 'preview')}>
        <div>{this.renderCommentBody()}</div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  users: PropTypes.object,
};

export default Comment;
