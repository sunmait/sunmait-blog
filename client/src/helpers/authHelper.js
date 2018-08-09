export const setAuthDataToLocalStorage = (accessToken, refreshToken, user) => {
  localStorage.setItem('AccessToken', accessToken);
  localStorage.setItem('RefreshToken', refreshToken);
  localStorage.setItem('User', user);
};
