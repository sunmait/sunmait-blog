export const getUserFullName = () => {
  const userData = getAuthorizedUser();;
  return `${userData.FirstName} ${userData.LastName}`;
};

export const getAuthorizedUser = () => {
  const userDataJSON = localStorage.getItem('User');
  return JSON.parse(userDataJSON);
};

export const getUsers = () => {
  return cy.request('/api/users');
};

export const getUserById = userId => {
  return getUsers()
    .then(response => {
      return response.body.find(i => i.id === userId);
    });
};
