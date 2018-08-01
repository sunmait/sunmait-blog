import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';

const baseClass = 'add-post-image-preview';
const bemClasses = getBEMClasses([baseClass]);

const defaultUrl = 'https://currys-ssl.cdn.dixons.com/grafx/images/blank.gif'

export const ImagePreview = props => {
  const imageUrl = props.input.value;
  const imageUrlForPreview = imageUrl || defaultUrl;
 
  return (
    <div className={bemClasses()} name={props.name}>
      <img
        className={bemClasses('image')}
        src={imageUrlForPreview}
        alt="main post illustration"
      />
    </div>
  );
};

const ImagePreviewField = props => {
  return <Field name={props.name} component={ImagePreview} {...props} />;
};

ImagePreviewField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ImagePreviewField;
