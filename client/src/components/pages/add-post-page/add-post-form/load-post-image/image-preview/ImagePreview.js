import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getBEMClasses } from 'components/helpers/BEMHelper';

const baseClass = 'add-post-image-preview';
const bemClasses = getBEMClasses([baseClass]);

const defaultUrl = 'https://st3.depositphotos.com/1742172/18355/v/1600/depositphotos_183552448-stock-illustration-vector-illustration-funny-cartoon-cat.jpg'

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
