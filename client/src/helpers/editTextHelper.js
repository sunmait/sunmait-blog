const editTextWithHotkey = className => {
  const selection = window.getSelection();

  if (selection.rangeCount) {
    const selectionText = selection.toString();

    const text = document.querySelector(`.${className.replace(/ /g, '.')}`);

    console.log(text);

    // text.classList.add('add-post-form__textarea--bold');
  }
};

export default editTextWithHotkey;
