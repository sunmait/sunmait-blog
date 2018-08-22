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
