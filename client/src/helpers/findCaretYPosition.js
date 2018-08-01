import getCursorXY from './getCursorXY';

const findCaretYPosition = (textareaRef, textarea) => {
  const {
    offsetTop,
    offsetHeight,
    scrollTop
  } = textareaRef.current;
  const {selectionStart} = textarea;
  const { y } = getCursorXY(textarea, selectionStart);
  const newTop = scrollTop + offsetTop + offsetHeight + 10
  return (y - newTop);
}

export default findCaretYPosition