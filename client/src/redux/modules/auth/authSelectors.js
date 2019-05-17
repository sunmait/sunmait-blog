import { createSelector } from 'reselect';

export const getUserIdSelector = createSelector([state => state.user.user], user => {
  return user ? user.id : null;
});
