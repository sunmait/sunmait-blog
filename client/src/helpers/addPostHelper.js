export const checkIfRowIsEmpty = () => {
  const tagNames = ['IMG', 'IFRAME', 'HR'];

  if (window.getSelection) {
    const userSelection = window.getSelection();

    if (userSelection.rangeCount) {
      const range = userSelection.getRangeAt(0);

      const childNodes = range.commonAncestorContainer.firstChild;

      if (!range.collapsed) {
        return false;
      }

      return !!childNodes && !tagNames.includes(childNodes.tagName);
    }
    return false;
  }
};

export const findCaretYPosition = () => {
  let userSelection;
  let range;
  let caretYPosition = 0;

  if (window.getSelection) {
    userSelection = window.getSelection();

    if (userSelection.rangeCount) {
      range = userSelection.getRangeAt(0);
      const commonContainer = range.commonAncestorContainer;

      if (commonContainer.length) {
        caretYPosition = commonContainer.parentNode.offsetTop - commonContainer.parentNode.parentNode.scrollTop;

        return caretYPosition - 3;
      }
      caretYPosition = commonContainer.offsetTop - commonContainer.parentNode.scrollTop;

      return caretYPosition - 3;
    }
  }
};
