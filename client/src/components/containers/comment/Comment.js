import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Item } from '../../common/listItem/ListItem';
import 'assets/styles/Comment.css';

class Comment extends React.Component {
  renderComment() {
    const { Text, UserId, CreatedAt } = this.props.comment;
    const { users } = this.props;
    const styles = {
      inline: {
        display: 'inline',
      },
    };
    const publishingDate = format(CreatedAt, 'MMM D, YYYY');

    let text = Text;

    if (text.length > 150) {
      text = text.slice(0, 150);
      text += '...';
    }

    return (
      <React.Fragment>
        <Item
          styles={styles}
          date={publishingDate}
          user={users.find(user => [UserId] in user)[UserId]}
          userAvatar={users[UserId - 1].PhotoUrl}
          text={text}
          data-cy="comment"
        />
      </React.Fragment>
    );
  }

  render() {
    return this.renderComment();
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  users: PropTypes.array,
};

export default Comment;
