import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/button/Button.jsx';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import ImagePreviewField from './image-preview/ImagePreview.js';

const addLoadImage = 'add-post-load-image';
const bemClasses = getBEMClasses([addLoadImage]);

class LoadPostImage extends React.Component {
  handleFileLoad = (e) => {
    e.preventDefault();
    const fileElem = document.getElementById("fileElem");

    if (fileElem) {
      fileElem.click();
    }
  }
 
  handleFiles = (e) => {
    const file = e.target.files[0];

    this.props.loadPostImage(file);
  };

  render() {
    // TODO add progress spiner when image is loading
    return (
      <div className={bemClasses()}>
        <ImagePreviewField name="ImageUrl" />
        <input type="file" id="fileElem" accept="image/*" style={{display: 'none'}} onChange={this.handleFiles} />
        <Button onClick={this.handleFileLoad} label="Load image" />
      </div>
    );
  }
};

LoadPostImage.propTypes = {
  loadPostImage: PropTypes.func.isRequired,
};

export default LoadPostImage;
