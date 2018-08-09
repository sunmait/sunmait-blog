const getCursorXY = (input, selectionPoint) => {
  const { value } = input;

  const div = document.createElement('div');
  const copyStyle = getComputedStyle(input);
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }
  const textContent = value.substr(0, selectionPoint);
  div.textContent = textContent;
  div.style.height = 'auto';
  const span = document.createElement('span');
  span.textContent = value.substr(selectionPoint) || '.';
  div.appendChild(span);
  document.body.appendChild(div);
  const { offsetLeft: spanX, offsetTop: spanY } = span;
  document.body.removeChild(div);
  return {
    x: spanX,
    y: spanY,
  };
};

export default getCursorXY;
