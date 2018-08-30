import { setAuthDataToLocalStorage } from '../../src/helpers/authHelper';
import user from '../fixtures/userToLogin.json';

export const setLoginState = () => {
  return cy.request('POST', 'api/auth', user)
    .then(res => {
      const { AccessToken, RefreshToken, Data } = res.body;
      setAuthDataToLocalStorage(AccessToken, RefreshToken, JSON.stringify(Data));
    });
};

export const testUserIsLoggedOut = () => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const user = localStorage.getItem('User');

  expect(accessToken).to.eq(null);
  expect(refreshToken).to.eq(null);
  expect(user).to.eq(null);
};

export const testUserIsLoggedIn = () => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const user = localStorage.getItem('User');

  expect(accessToken).to.not.eq(null);
  expect(refreshToken).to.not.eq(null);
  expect(user).to.not.eq(null);
};

export const userAuthorization = () => {
  cy.get('[data-cy=login-btn]').click();
  cy.get('[data-cy=login-modal] input[name=login]').type(user.Login);
  cy.get('[data-cy=login-modal] input[name=password]').type(user.Password);
  cy.get('[data-cy=login-modal] button[type=submit]').click();
};
