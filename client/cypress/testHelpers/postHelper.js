export const searchFormClassName = 'search-bar__form';
export const searchFormClass = `.${searchFormClassName}`;

export const searchPostInput = 'searchQuery';
export const searchPostInputPath = `${searchFormClass} input[name=${searchPostInput}]`;

export const getPosts = () => {
  return cy.request('GET', '/api/posts');
};

export const getComments = PostId => {
  return cy.request('GET', `/api/comments/${PostId}`);
};

export const getPostsByUserId = userId => {
  return cy.request('GET', `/api/users/${userId}/posts`).then(response => {
    return response.body;
  });
};

export const searchPostsWithLongestName = posts => {
  const longestName = posts.sort((a, b) => {
    return b.Title.length - a.Title.length;
  })[0].Title;
  const postsAmount = posts.filter(post => post.Title === longestName).length;

  cy.get(searchPostInputPath).type(longestName);
  cy.get('.article__container .article__title')
    .contains(longestName)
    .should('be.visible');
  cy.get('.article__container').should('have.length', postsAmount);
};

export const testAmountOfPosts = amount => {
  cy.get('.posts-list__container')
    .find('.article__container')
    .should('have.length', amount);
};
export const addTag = text => {
  cy.get('[data-cy=tags-input]').type(text + '{enter}');
};
