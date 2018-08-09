import React from 'react';
import findPopupPosition from 'helpers//findPopupPosition';
import FacebookIcon from './FacebookIcon';

class FacebookShareButton extends React.Component {
  customOnClick = e => {
    e.preventDefault();
    const width = 600;
    const height = 350;
    const { left, top } = findPopupPosition(width, height);
    const facebookWindow = window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + this.props.url,
      'facebook-popup',
      `height=${height}, width=${width}, left=${left}, top=${top}`
    );
    if (facebookWindow.focus) {
      facebookWindow.focus();
    }
  };

  render() {
    return (
      <span onClick={this.customOnClick}>
        <FacebookIcon />
      </span>
    );
  }
}

export default FacebookShareButton;
