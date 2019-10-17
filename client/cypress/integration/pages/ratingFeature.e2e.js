import {} from '../../testHelpers/postHelper';
import { getUserById } from '../../testHelpers/userHelper';
import { getComments, getPost } from '../../testHelpers/postHelper';
import user from '../../fixtures/userToLogin.json';
import { format } from 'date-fns';
describe('My first Test', () => {
  it('Unvisible user rating if you not auth', () => {
    cy.visit('/post/2');
    cy.log('You can not see user ratin if you not authorized');
    cy.get('[data-cy=user-rating]').should('not.be.visible');
  });
  it('Visible user rating if you auth', () => {
    cy.log('click on Log In btn');
    cy.get('[data-cy=login-btn-for-add-comment]').click();

    cy.log('Check modal visible');
    cy.get('[data-cy=login-modal]').should('be.visible');

    cy.log('Filing form ');
    cy.get('[data-cy=login-modal] input[name=login]').type(user.Login);
    cy.get('[data-cy=login-modal] input[name=password]').type(user.Password);

    cy.log('Press Log In button');
    cy.get('[data-cy=login-modal] button[type=submit]').click();
    cy.get('[data-cy=user-rating]').should('be.visible');
  });
  it('User can change his post rating', () => {
    cy.log('click at stars');
    cy.get('[data-cy=user-rating] label[for=simple-controlled-5]')
      .click()
      .find('span')
      .should($span => {
        expect($span[0].className).to.match(/-iconFilled/);
      });
  });
});
