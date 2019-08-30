export const parseTags = str => {
  const iStr = str.trim();
  let arr = iStr.split(' ');
  let strArr = [];
  let tags = [];
  arr.forEach(el => {
    if (el.startsWith('#')) {
      tags.push(el.slice(1));
    } else {
      strArr.push(el);
    }
  });
  return {
    tags: tags[0] || null,
    str: strArr.join(' '),
  };
};
