import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

const searchBarSelector = formValueSelector('searchBar');

const reversedPostsSelector = posts => posts.reverse();

const userPostsSelector = (posts, user) => {
  return posts.filter(post => post.UserId === user.id)
};

const searchQuerySelector = state => (searchBarSelector(state, 'searchQuery') || '');

const filteredBySearchQuery = (searchQuery, posts, users) => {
  let filteredPosts = [ ...posts];
  if (searchQuery.trim().length > 0) {
    const queryRegexp = new RegExp(searchQuery, 'i');

    filteredPosts = filteredPosts.filter(post => (
      post.Title.match(queryRegexp) ||
      users[post.UserId].match(queryRegexp)
    ));
  }

  return filteredPosts;
}

const filteredForUserBySearchQuery = (searchQuery, posts) => {
  let filteredPosts = [ ...posts];
  if (searchQuery.trim().length > 0) {
    const queryRegexp = new RegExp(searchQuery, 'i');

    filteredPosts = filteredPosts.filter(post => (post.Title.match(queryRegexp)));
  }

  return filteredPosts;
}

const reversedPosts = createSelector(
  state => state.posts.posts,
  reversedPostsSelector,
)

const filteredPostsForAuthUser = createSelector(
  reversedPosts,
  state => state.user.user,
  userPostsSelector,
)

/* search posts for 'home' page */
export const searchPostsSelector = createSelector(
  searchQuerySelector,
  reversedPosts,
  state => state.profile.usersById,
  filteredBySearchQuery,
)

/* search posts for 'my posts' page */
export const searchAuthUserPostsSelector = createSelector(
  searchQuerySelector,
  filteredPostsForAuthUser,
  filteredForUserBySearchQuery,
)
