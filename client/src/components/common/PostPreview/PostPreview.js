import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { getBEMClasses } from 'helpers//BEMHelper';

const baseClass = 'post-preview';
const bemClasses = getBEMClasses([baseClass]);

export const PostPreview = props => {
  const { postData } = props;

  return (
    <div className={bemClasses('description')}>
      <ReactMarkdown escapeHtml={false} source={postData} />
    </div>
  );
};

PostPreview.propTypes = {
  postData: PropTypes.string,
};
