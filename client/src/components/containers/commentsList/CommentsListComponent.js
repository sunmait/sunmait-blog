import React from 'react';
import PropTypes from 'prop-types';
import { ListItems } from '../../common/lists/List';
import Comment from 'components/containers/comment/CommentContainer';
import Loader from 'components/common/loader';

export const CommentsList = ({ comments, getFetchingStatus }) => {
  const styles = {
    root: {
      width: '100%',
    },
  };

  return (
    <React.Fragment>
      {!getFetchingStatus && comments.length ? (
        <ListItems styles={styles}>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ListItems>
      ) : (
        <h5>No Comments</h5>
      )}
    </React.Fragment>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};
