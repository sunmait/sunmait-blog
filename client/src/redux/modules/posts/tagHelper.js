export const getTags = str => {
  str.trim();
  let arr = str.split(' ');
  let strarr = [];
  let tags = [];
  arr.forEach(el => {
    if (el.startsWith('#')) {
      tags.push(el.slice(1));
    } else {
      strarr.push(el);
    }
  });
  return {
    tags: tags[0] || null,
    str: strarr.join(' '),
  };
};
