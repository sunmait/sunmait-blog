export const getPosts = () => {
  return cy.request('GET', '/api/posts');  
};
