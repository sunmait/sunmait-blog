export const checkIfRowIsEmpty = (textarea, selection) => {
  const position = selection > 0 ? selection - 1 : 0;
  const symbolsNearTheCaret = textarea.value.substr(position, 2);
  let rowIsEmpty = false;

  if (symbolsNearTheCaret.length === 0) rowIsEmpty = true;
  if (symbolsNearTheCaret.length === 2 && symbolsNearTheCaret === '\n\n') {
    rowIsEmpty = true;
  }
  if (symbolsNearTheCaret.length === 1 && symbolsNearTheCaret === '\n') {
    rowIsEmpty = true;
  }

  return rowIsEmpty;
};

export const findCaretYPosition = textarea => {
  const { scrollTop, selectionStart, value } = textarea;
  const div = document.createElement('div');
  const copyStyle = getComputedStyle(textarea);

  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }

  const textContent = value.substr(0, selectionStart);

  div.textContent = textContent;
  div.style.height = 'auto';
  div.style.position = 'relative';

  const span = document.createElement('span');

  span.textContent = value.substr(selectionStart) || value.substr(selectionStart - 1);
  div.appendChild(span);
  document.body.appendChild(div);

  let { offsetTop: spanY } = span;

  document.body.removeChild(div);
  if (spanY !== 0) spanY -= 3;

  return spanY - scrollTop;
};
