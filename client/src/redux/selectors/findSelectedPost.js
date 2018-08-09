import { createSelector } from 'reselect';

const findPost = (posts, postId) => {
  let post = posts.find(post => post.id === postId);
  if (!post) {
    post = {
      Title: '',
      Description: '',
      ImageUrl: '',
    };
  }
  post = { ...post, textareaSelectionStart: 0, textareaSelectionEnd: 0 };

  return post;
};

export const findSelectedPost = createSelector((posts, postId) => posts, (posts, postId) => postId, findPost);
