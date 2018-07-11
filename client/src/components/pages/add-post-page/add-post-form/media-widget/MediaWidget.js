import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'components/common/button/Button.jsx';
import Popover from 'material-ui/Popover';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';

const mediaWidget = 'add-post-media-widget';
const bemClasses = getBEMClasses([mediaWidget]);

class MediaWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  handleOpenWidgets = (e) => {
    e.preventDefault();
    this.setState({
      isMenuOpen: true,
      anchorEl: e.currentTarget
    })
  }

  handleClose = (e) => {
    this.handleCloseMenu();
  };

  handleClickInsertImage = (e) => {
    this.handleCloseMenu();
  };

  handleClickInsertVideo = (e) => {
    this.handleCloseMenu();
  };

  handleClickInsertDivider = (e) => {
    this.handleCloseMenu();
  };

  handleCloseMenu = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  renderMenu() {
    return (
      <Popover
        open={this.state.isMenuOpen}
        onClose={this.handleClose}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          'vertical': 'middle',
          'horizontal': 'right',
        }}
        transformOrigin={{
          'vertical': 'middle',
          'horizontal': 'left',
        }}
      >
        <ul className={bemClasses('menu-items')}>
          <MenuItem onClick={this.handleClickInsertImage}>
            <AddCircleOutline />
          </MenuItem>
          <MenuItem onClick={this.handleClickInsertVideo}>
            <AddCircleOutline />
          </MenuItem>
          <MenuItem onClick={this.handleClickInsertDivider}>
            <AddCircleOutline />
          </MenuItem>
        </ul>
      </Popover>
    );
  };

  render() {
    // TODO add progress spiner when image is loading
    return (
      <div classname={bemClasses()}>
        {this.renderMenu()}
        <IconButton
          aria-label="open-widgets"
          onClick={this.handleOpenWidgets}
        >
          <AddCircleOutline />
        </IconButton>
      </div>
    );
  }
};

MediaWidget.propTypes = {
};

export default MediaWidget;
