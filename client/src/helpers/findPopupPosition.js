const findPopupPosition = (popupWidth, popupHeight) => {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;

  const left = ((width / 2) - (popupWidth / 2)) + dualScreenLeft;
  const top = ((height / 2) - (popupHeight / 2)) + dualScreenTop;

  return { left, top }
}

export default findPopupPosition
