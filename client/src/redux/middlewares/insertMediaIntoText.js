import { change } from 'redux-form';
import { POSTS_CONSTANTS } from 'redux/modules/posts/constants';
import getYoutubeId from 'components/helpers/getYoutubeId.js';

export default store => next => action => {
  if (action.type === POSTS_CONSTANTS.INSERT_DIVIDER ||
    action.type === POSTS_CONSTANTS.INSERT_IMAGE ||
    action.type === POSTS_CONSTANTS.INSERT_VIDEO 
  ) {
    const { form } = store.getState();
    const {textareaSelectionStart, textareaSelectionEnd, Description} = form.post.values;
    let insertedMedia = '';

    if (action.type === POSTS_CONSTANTS.INSERT_DIVIDER) {
      insertedMedia = `\n\n<hr />\n\n`;
    }

    // TODO check if url is correct
    if (action.type === POSTS_CONSTANTS.INSERT_IMAGE && action.payload.url) {
      insertedMedia = `\n\n<image src="${action.payload.url}" />\n\n`;

      store.dispatch(
        change('post', 'insertImageUrl', '')
      );
    }

    // TODO check if url is correct
    if (action.type === POSTS_CONSTANTS.INSERT_VIDEO && action.payload.url) {
      insertedMedia = `\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYoutubeId(action.payload.url)}" frameborder="0" allowfullscreen></iframe>\n\n`;
      
      store.dispatch(
        change('post', 'insertVideoUrl', '')
      );
    }

    const newDecsription = Description.slice(0, textareaSelectionStart) +
      insertedMedia +
      Description.slice(textareaSelectionEnd + 1);
    
    store.dispatch(
      change('post', 'Description', newDecsription)
    );
  }
  
  next(action);
};
