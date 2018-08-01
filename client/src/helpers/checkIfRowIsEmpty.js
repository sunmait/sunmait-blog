const checkIfRowIsEmpty = (textarea, selection) => {
  const position = (selection > 0) ? selection - 1 : 0
  const symbolsNearTheCaret = textarea.value.substr(position, 2);
  let rowIsEmpty = false;
  if (symbolsNearTheCaret.length === 2 && symbolsNearTheCaret === '\n\n') {
    rowIsEmpty = true;
  }
  if (symbolsNearTheCaret.length === 1 && symbolsNearTheCaret === '\n') {
    rowIsEmpty = true;
  }

  return rowIsEmpty;
}

export default checkIfRowIsEmpty