import React from 'react';
import PropTypes from 'prop-types';
import { ListItems } from '../../common/lists/List';
import Comment from 'components/containers/comment/CommentContainer';
import Loader from 'components/common/loader';

export const CommentsList = ({ comments, getFetchingStatus, addFetchingStatus }) => {
  const styles = {
    root: {
      width: '100%',
    },
  };

  return (
    <React.Fragment>
      {(!getFetchingStatus || !addFetchingStatus) && comments.length ? (
        <ListItems styles={styles}>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ListItems>
      ) : null}
    </React.Fragment>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};
