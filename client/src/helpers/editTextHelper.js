const editTextWithHotkey = props => {
  const { selectionText, className } = props;

  console.log(className);

  console.log(document.getElementsByClassName(className));
  // console.log(selectionText);
};

export default editTextWithHotkey;
