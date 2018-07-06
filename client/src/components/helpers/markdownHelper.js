const markdown = require('marked');

export const getMarkdownLayout = (postId, description, isPreviewVersion) => {
  let text = markdown(description);
  let multidot = '';

  if (isPreviewVersion && text.length > 350) {
    text = text.slice(0, 350);
    multidot = '...';
  }
  return document.getElementById(`article-${postId}`).innerHTML = text + multidot;
};
