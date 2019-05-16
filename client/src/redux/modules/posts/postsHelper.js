import {
  DESKTOP_LAZY_LOAD_POST_NUMBER,
  TABLET_LAZY_LOAD_POST_NUMBER,
  MOBILE_LAZY_LOAD_POST_NUMBER,
} from 'redux/modules/posts/postsConstants';

export const getPostLazyLoadNumber = windowWidth => {
  if (windowWidth > 1300) {
    return DESKTOP_LAZY_LOAD_POST_NUMBER;
  } else if (windowWidth > 760 && windowWidth <= 1300) {
    return TABLET_LAZY_LOAD_POST_NUMBER;
  }
  return MOBILE_LAZY_LOAD_POST_NUMBER;
};
