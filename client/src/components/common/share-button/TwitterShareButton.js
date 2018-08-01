import React from 'react';
import findPopupPosition from 'helpers//findPopupPosition';
import TwitterIcon from './TwitterIcon';

class TwitterShareButton extends React.Component {
  customOnClick = (e) => {
    e.preventDefault();
    const params = `text=${this.props.innerText}&url=${this.props.url}`;
    const width = 600;
    const height = 350;
    const { left, top } = findPopupPosition(width, height);
    const twitterWindow = window.open(
      `https://twitter.com/share?${params}`,
      'twitter-popup',
      `height=${height}, width=${width}, left=${left}, top=${top}`
    );
    if (twitterWindow.focus) {
      twitterWindow.focus();
    }
  }

  render() {
    return (
      <span onClick={this.customOnClick}>
        <TwitterIcon />
      </span>
    );
  }
}

export default TwitterShareButton;

