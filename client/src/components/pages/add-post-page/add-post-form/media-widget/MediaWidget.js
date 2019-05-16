import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Movie from '@material-ui/icons/Movie';
import Image from '@material-ui/icons/Image';
import Remove from '@material-ui/icons/Remove';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import { getBEMClasses } from 'helpers//BEMHelper';
import InputWithPlaceholder from 'components/common/input/InputWithPlaceholder.jsx';

const mediaWidget = 'add-post-media-widget';
const bemClasses = getBEMClasses([mediaWidget]);

class MediaWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      isImageInputOpen: false,
      isVideoInputOpen: false,
    };
  }

  handleOpenWidgets = e => {
    e.preventDefault();
    this.setState({
      isMenuOpen: true,
      anchorEl: e.currentTarget,
    });
  };

  handleClose = e => {
    this.handleCloseMenu();
  };

  handleClickInsertImage = e => {
    const { isImageInputOpen } = this.state;
    const { insertImageUrl } = this.props;

    if (isImageInputOpen) {
      this.props.insertImageIntoText(insertImageUrl);
      this.handleCloseMenu();
    } else {
      this.setState({ isImageInputOpen: true, isVideoInputOpen: false });
    }
  };

  handleClickInsertVideo = e => {
    const { isVideoInputOpen } = this.state;
    const { insertVideoUrl } = this.props;

    if (isVideoInputOpen) {
      this.props.insertVideoIntoText(insertVideoUrl);
      this.handleCloseMenu();
    } else {
      this.setState({ isImageInputOpen: false, isVideoInputOpen: true });
    }
  };

  handleClickInsertDivider = e => {
    this.props.insertDividerIntoText();
    this.handleCloseMenu();
  };

  handleCloseMenu = () => {
    this.setState({
      isMenuOpen: false,
      isImageInputOpen: false,
      isVideoInputOpen: false,
    });
  };

  renderMenu() {
    const imageInputWidth = this.state.isImageInputOpen ? 220 : 0;
    const imageButtonColor = this.state.isImageInputOpen ? 'primary' : 'secondary';
    const videoInputWidth = this.state.isVideoInputOpen ? 220 : 0;
    const videoButtonColor = this.state.isVideoInputOpen ? 'primary' : 'secondary';

    return (
      <Popover
        open={this.state.isMenuOpen}
        onClose={this.handleClose}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <ul className={bemClasses('menu-items')}>
          <MenuItem onClick={this.handleClickInsertImage} data-cy="img-url-hidden-input-open-btn">
            <Image color={imageButtonColor} />
          </MenuItem>
          <div
            className={bemClasses('menu-item-hidden-input')}
            style={{ width: imageInputWidth }}
            data-cy="menu-item-hidden-input"
          >
            <InputWithPlaceholder name="insertImageUrl" placeholder="Enter image url" autoComplete="off" />
          </div>
          <MenuItem onClick={this.handleClickInsertVideo}>
            <Movie color={videoButtonColor} />
          </MenuItem>
          <div className={bemClasses('menu-item-hidden-input')} style={{ width: videoInputWidth }}>
            <InputWithPlaceholder name="insertVideoUrl" placeholder="Enter video url" autoComplete="off" />
          </div>
          <MenuItem onClick={this.handleClickInsertDivider}>
            <Remove color="secondary" />
          </MenuItem>
        </ul>
      </Popover>
    );
  }

  render() {
    return (
      <div className={bemClasses()} style={{ top: this.props.paddingTop }} data-cy={bemClasses()}>
        {this.renderMenu()}
        <IconButton aria-label="open-widgets" onClick={this.handleOpenWidgets}>
          <AddCircleOutline />
        </IconButton>
      </div>
    );
  }
}

MediaWidget.propTypes = {
  paddingTop: PropTypes.number.isRequired,
};

export default MediaWidget;
