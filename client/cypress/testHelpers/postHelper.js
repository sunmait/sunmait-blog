export const getPosts = () => {
  return cy.request('GET', '/api/posts');  
};

export const getPostsByUserId = (userId) => {
  return ( 
    cy.request('GET', `/api/users/${userId}/posts`)
      .then((response) => {
        return response.body;
      })  
  );
};

export const searchPostsWithLongestName = posts => {
  const longestName = posts.sort((a, b) => {
    return b.Title.length - a.Title.length;
  })[0].Title;
  const postsAmount = posts.filter((post) => post.Title === longestName).length;

  cy.get('form input[name=searchQuery]').type(longestName);
  cy.get('.article__container .article__title').contains(longestName).should('be.visible');
  cy.get('.article__container').should('have.length', postsAmount);
}