import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/button/Button.jsx';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import ImagePreviewField from './image-preview/ImagePreview.js';
import { CircularProgress } from 'material-ui/Progress';

const addLoadImage = 'add-post-load-image';
const bemClasses = getBEMClasses([addLoadImage]);

class LoadPostImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.urlValue !== this.props.urlValue) {
      this.setState({isLoading: false});
    }
  }

  handleFileLoad = (e) => {
    e.preventDefault();
    const fileElem = document.getElementById("fileElem");

    if (fileElem) {
      fileElem.click();
    }
  }
 
  handleFiles = (e) => {
    const file = e.target.files[0];

    this.setState({isLoading: true});
    this.props.loadPostImage(file);
  };

  render() {
    return (
      <div className={bemClasses()}>
        <ImagePreviewField name="ImageUrl" />
        <div className={bemClasses('progress-wrapper')}>
          {this.state.isLoading && <CircularProgress size={20} thickness={4} />}
        </div>
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
