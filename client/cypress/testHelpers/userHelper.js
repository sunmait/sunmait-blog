export const getUserFullName = () => {
  const userData = getAuthorizedUser();;
  return `${userData.FirstName} ${userData.LastName}`;
};

export const getAuthorizedUser = () => {
  const userDataJSON = localStorage.getItem('User');
  return JSON.parse(userDataJSON);
};
