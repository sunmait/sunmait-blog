import React from 'react';
import PropTypes from 'prop-types';

import { getBEMClasses } from 'helpers//BEMHelper';
import Comment from 'components/containers/comment/CommentContainer';
import Loader from 'components/common/loader';

import './CommentsList.css';

const pageClass = 'comments-list';
const bemClasses = getBEMClasses([pageClass]);

export const CommentsList = ({ comments, getFetchingStatus, addFetchingStatus }) => {
  return (
    <React.Fragment>
      {(!getFetchingStatus || !addFetchingStatus) && comments.length ? (
        <div className={bemClasses('container')}>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : null}
    </React.Fragment>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};
